import { useCallback, useEffect, useMemo, useState } from "react";
import ClinicDeleteModal from "../../Components/Clinic/ClinicDeleteModal";
import ClinicFormModal from "../../Components/Clinic/ClinicFormModal";
import ClinicSessionFormModal from "../../Components/Clinic/ClinicSessionFormModal";
import ClinicSessionTable from "../../Components/Clinic/ClinicSessionTable";
import ClinicShell from "../../Components/Clinic/ClinicShell";
import ClinicTable from "../../Components/Clinic/ClinicTable";
import {
  EMPTY_CLINIC_FORM,
  EMPTY_SESSION_FORM,
  asArray,
  getClinicDoctorIds,
  getEntityId,
  getSessionClinicId,
  isClinicAssignedToDoctor,
  normalizeTime,
  toApiTime,
} from "../../Components/Clinic/clinicUtils";
import { getAllDoctors } from "../../Services/doctorService";
import {
  createClinic,
  createClinicSession,
  deleteClinic,
  deleteClinicSession,
  getAllClinicSessions,
  getAllClinics,
  updateClinic,
  updateClinicSession,
} from "../../Services/clinicService";
import { getAuthData, ROLE } from "../../Utils/auth";

export default function ClinicPage() {
  const authData = getAuthData();
  const canManageClinics = authData?.role === ROLE.ADMIN;
  const canManageSessions = authData?.role === ROLE.CONSULTANT;
  const canViewAllClinics =
    canManageClinics ||
    authData?.role === ROLE.CONSULTANT ||
    authData?.role === ROLE.PATIENT;
  const [activeTab, setActiveTab] = useState("clinics");
  const [clinics, setClinics] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [clinicForm, setClinicForm] = useState(EMPTY_CLINIC_FORM);
  const [sessionForm, setSessionForm] = useState(EMPTY_SESSION_FORM);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [clinicData, sessionData, doctorData] = await Promise.all([
        getAllClinics(),
        getAllClinicSessions(),
        getAllDoctors(),
      ]);

      setClinics(asArray(clinicData));
      setSessions(asArray(sessionData));
      setDoctors(asArray(doctorData));
      setApiError("");
    } catch (error) {
      setApiError(error.message || "Failed to load clinic data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchData, 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const visibleClinics = useMemo(() => {
    if (canViewAllClinics) return clinics;
    return clinics.filter((clinic) => isClinicAssignedToDoctor(clinic, authData));
  }, [authData, canViewAllClinics, clinics]);

  const clinicById = useMemo(() => {
    return visibleClinics.reduce((map, clinic) => {
      map[String(getEntityId(clinic))] = clinic;
      return map;
    }, {});
  }, [visibleClinics]);

  const visibleClinicIds = useMemo(
    () => new Set(visibleClinics.map((clinic) => String(getEntityId(clinic)))),
    [visibleClinics]
  );

  const visibleSessions = useMemo(() => {
    if (canViewAllClinics) return sessions;
    return sessions.filter((session) => visibleClinicIds.has(String(getSessionClinicId(session))));
  }, [canViewAllClinics, sessions, visibleClinicIds]);

  const filteredClinics = visibleClinics.filter((clinic) => {
    const query = search.toLowerCase();
    return (
      clinic.clinicName?.toLowerCase().includes(query) ||
      clinic.description?.toLowerCase().includes(query)
    );
  });

  const filteredSessions = visibleSessions.filter((session) => {
    const query = search.toLowerCase();
    const clinicName =
      clinicById[String(getSessionClinicId(session))]?.clinicName ||
      session.clinic?.clinicName ||
      session.clinicName ||
      "";
    return (
      clinicName.toLowerCase().includes(query) ||
      session.location?.toLowerCase().includes(query) ||
      session.clinicDate?.toLowerCase().includes(query)
    );
  });

  const openCreateClinic = () => {
    setClinicForm(EMPTY_CLINIC_FORM);
    setSelected(null);
    setErrors({});
    setModal("createClinic");
  };

  const openEditClinic = (clinic) => {
    setClinicForm({
      clinicName: clinic.clinicName || "",
      description: clinic.description || "",
      doctorIds: getClinicDoctorIds(clinic).map(Number),
    });
    setSelected(clinic);
    setErrors({});
    setModal("editClinic");
  };

  const openCreateSession = () => {
    setSessionForm(EMPTY_SESSION_FORM);
    setSelected(null);
    setErrors({});
    setModal("createSession");
  };

  const openEditSession = (session) => {
    setSessionForm({
      clinicId: session.clinicId || getEntityId(session.clinic) || "",
      clinicDate: session.clinicDate || "",
      startTime: normalizeTime(session.startTime),
      endTime: normalizeTime(session.endTime),
      location: session.location || "",
      maximumPatients: session.maximumPatients ?? "",
    });
    setSelected(session);
    setErrors({});
    setModal("editSession");
  };

  const openDelete = (type, item) => {
    setSelected(item);
    setErrors({});
    setModal(type === "clinic" ? "deleteClinic" : "deleteSession");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setErrors({});
  };

  const changeClinic = (field, value) => {
    setClinicForm((form) => ({ ...form, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const changeSession = (field, value) => {
    setSessionForm((form) => ({ ...form, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const toggleDoctor = (doctorId) => {
    const id = Number(doctorId);
    const nextIds = clinicForm.doctorIds.includes(id)
      ? clinicForm.doctorIds.filter((currentId) => currentId !== id)
      : [...clinicForm.doctorIds, id];
    changeClinic("doctorIds", nextIds);
  };

  const validateClinic = () => {
    const nextErrors = {};
    if (!clinicForm.clinicName.trim()) nextErrors.clinicName = "Clinic name is required.";
    return nextErrors;
  };

  const validateSession = (isCreate) => {
    const nextErrors = {};
    if (isCreate && !sessionForm.clinicId) nextErrors.clinicId = "Clinic is required.";
    if (sessionForm.maximumPatients && Number(sessionForm.maximumPatients) < 1) {
      nextErrors.maximumPatients = "Maximum patients must be at least 1.";
    }
    return nextErrors;
  };

  const clinicPayload = () => ({
    clinicName: clinicForm.clinicName.trim(),
    description: clinicForm.description.trim() || null,
    doctorIds: clinicForm.doctorIds,
  });

  const sessionPayload = () => ({
    clinicId: sessionForm.clinicId ? Number(sessionForm.clinicId) : null,
    clinicDate: sessionForm.clinicDate || null,
    startTime: toApiTime(sessionForm.startTime) || null,
    endTime: toApiTime(sessionForm.endTime) || null,
    location: sessionForm.location.trim() || null,
    maximumPatients: sessionForm.maximumPatients ? Number(sessionForm.maximumPatients) : null,
  });

  const saveClinic = async (mode) => {
    const nextErrors = validateClinic();
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    try {
      setApiError("");
      if (mode === "create") {
        await createClinic(clinicPayload());
      } else {
        await updateClinic(getEntityId(selected), clinicPayload());
      }
      await fetchData();
      closeModal();
    } catch (error) {
      setApiError(error.message || `Failed to ${mode} clinic.`);
    }
  };

  const saveSession = async (mode) => {
    const nextErrors = validateSession(mode === "create");
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    try {
      setApiError("");
      if (mode === "create") {
        await createClinicSession(sessionPayload());
      } else {
        await updateClinicSession(getEntityId(selected), sessionPayload());
      }
      await fetchData();
      closeModal();
    } catch (error) {
      setApiError(error.message || `Failed to ${mode} clinic session.`);
    }
  };

  const removeSelected = async () => {
    try {
      setApiError("");
      if (modal === "deleteClinic") {
        await deleteClinic(getEntityId(selected));
      } else {
        await deleteClinicSession(getEntityId(selected));
      }
      await fetchData();
      closeModal();
    } catch (error) {
      setApiError(error.message || "Failed to remove item.");
    }
  };

  const title = canManageClinics
    ? "Clinics"
    : authData?.role === ROLE.CONSULTANT
      ? "Clinic Sessions"
      : authData?.role === ROLE.PATIENT
        ? "Clinics & Sessions"
        : "My Clinics";
  const subtitle = canViewAllClinics
    ? authData?.role === ROLE.PATIENT
      ? `${clinics.length} clinics, ${sessions.length} sessions available to watch`
      : `${clinics.length} clinics, ${sessions.length} sessions`
    : `${visibleClinics.length} assigned clinics, ${visibleSessions.length} sessions`;

  return (
    <ClinicShell
      title={title}
      subtitle={subtitle}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      search={search}
      setSearch={setSearch}
      canAddClinic={canManageClinics}
      canAddSession={canManageSessions}
      onAddClinic={openCreateClinic}
      onAddSession={openCreateSession}
    >
      {apiError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {apiError}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
          Loading clinic data...
        </div>
      ) : activeTab === "clinics" ? (
        <ClinicTable
          clinics={filteredClinics}
          doctors={doctors}
          canManage={canManageClinics}
          onEdit={openEditClinic}
          onDelete={openDelete}
        />
      ) : (
        <ClinicSessionTable
          sessions={filteredSessions}
          clinicById={clinicById}
          canManage={canManageSessions}
          onEdit={openEditSession}
          onDelete={openDelete}
        />
      )}

      {canManageClinics && (modal === "createClinic" || modal === "editClinic") && (
        <ClinicFormModal
          mode={modal === "createClinic" ? "create" : "edit"}
          form={clinicForm}
          doctors={doctors}
          errors={errors}
          onChange={changeClinic}
          onToggleDoctor={toggleDoctor}
          onClose={closeModal}
          onSubmit={() => saveClinic(modal === "createClinic" ? "create" : "edit")}
        />
      )}

      {canManageSessions && (modal === "createSession" || modal === "editSession") && (
        <ClinicSessionFormModal
          mode={modal === "createSession" ? "create" : "edit"}
          form={sessionForm}
          clinics={visibleClinics}
          errors={errors}
          onChange={changeSession}
          onClose={closeModal}
          onSubmit={() => saveSession(modal === "createSession" ? "create" : "edit")}
        />
      )}

      {((modal === "deleteClinic" && canManageClinics) ||
        (modal === "deleteSession" && canManageSessions)) &&
        selected && (
        <ClinicDeleteModal
          type={modal === "deleteClinic" ? "clinic" : "session"}
          selected={selected}
          onClose={closeModal}
          onDelete={removeSelected}
        />
      )}
    </ClinicShell>
  );
}
