import { useCallback, useEffect, useMemo, useState } from "react";
import LabAdminHeader from "../../Components/Lab/LabAdminHeader";
import LabDeleteModal from "../../Components/Lab/LabDeleteModal";
import LabModal from "../../Components/Lab/LabModal";
import LabStats from "../../Components/Lab/LabStats";
import LabTable from "../../Components/Lab/LabTable";
import PatientLabReports from "../../Components/Lab/PatientLabReports";
import {
  asArray,
  buildLabUpdatePayload,
  buildLabUserPayload,
  EMPTY_LAB_FORM,
  getLabId,
  unwrapLab,
  validateLabForm,
} from "../../Components/Lab/labUtils";
import {
  deleteLab,
  getAllLabs,
  getLabById,
  updateLab,
} from "../../Services/labService";
import { registerLabUser } from "../../Services/authService";
import { getAuthData, ROLE } from "../../Utils/auth";

export default function LabPage() {
  const authData = getAuthData();
  const canManageLabs = authData?.role === ROLE.ADMIN || authData?.role === ROLE.LAB;
  const isPatient = authData?.role === ROLE.PATIENT;
  const [labs, setLabs] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_LAB_FORM);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLabs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllLabs();
      setLabs(asArray(data));
      setApiError("");
    } catch (error) {
      setApiError(error.message || "Failed to load lab accounts.");
      setLabs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchLabs, 0);
    return () => clearTimeout(timer);
  }, [fetchLabs]);

  const stats = useMemo(() => {
    const labRoleCount = labs.filter((lab) => lab.role === ROLE.LAB).length;
    return [
      ["Total Labs", labs.length],
      ["Lab Accounts", labRoleCount],
      ["Other Records", labs.length - labRoleCount],
    ];
  }, [labs]);

  const filteredLabs = useMemo(() => {
    const query = search.toLowerCase();
    return labs.filter(
      (lab) =>
        lab.firstName?.toLowerCase().includes(query) ||
        lab.lastName?.toLowerCase().includes(query) ||
        lab.nic?.toLowerCase().includes(query) ||
        lab.mobile?.toLowerCase().includes(query) ||
        lab.email?.toLowerCase().includes(query)
    );
  }, [labs, search]);

  const openCreate = () => {
    setForm(EMPTY_LAB_FORM);
    setSelected(null);
    setErrors({});
    setModal("create");
  };

  const openEdit = async (lab) => {
    try {
      setApiError("");
      const latestLab = unwrapLab(await getLabById(getLabId(lab)));
      setForm({
        firstName: latestLab.firstName || "",
        lastName: latestLab.lastName || "",
        nic: latestLab.nic || "",
        dob: latestLab.dob || "",
        mobile: latestLab.mobile || "",
        address: latestLab.address || "",
        email: latestLab.email || "",
        password: "",
        confirmPassword: "",
      });
      setSelected(latestLab);
      setErrors({});
      setModal("edit");
    } catch (error) {
      setApiError(error.message || "Failed to load lab account.");
    }
  };

  const openDelete = (lab) => {
    setSelected(lab);
    setErrors({});
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setErrors({});
  };

  const change = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    }
  };

  const saveLab = async (mode) => {
    const nextErrors = validateLabForm(form, mode);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setApiError("");
      if (mode === "create") {
        await registerLabUser(buildLabUserPayload(form));
      } else {
        await updateLab(getLabId(selected), buildLabUpdatePayload(form));
      }
      await fetchLabs();
      closeModal();
    } catch (error) {
      setApiError(error.message || `Failed to ${mode} lab account.`);
    }
  };

  const removeLab = async () => {
    try {
      setApiError("");
      await deleteLab(getLabId(selected));
      await fetchLabs();
      closeModal();
    } catch (error) {
      setApiError(error.message || "Failed to delete lab account.");
    }
  };

  if (isPatient) {
    return <PatientLabReports />;
  }

  if (!canManageLabs) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        You do not have permission to manage lab accounts.
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-800">
      <LabAdminHeader onCreate={openCreate} />
      <LabStats stats={stats} />
      <LabTable
        apiError={apiError}
        filteredLabs={filteredLabs}
        loading={loading}
        onDelete={openDelete}
        onEdit={openEdit}
        onSearch={setSearch}
        search={search}
      />

      {(modal === "create" || modal === "edit") && (
        <LabModal
          mode={modal}
          form={form}
          errors={errors}
          onChange={change}
          onClose={closeModal}
          onSubmit={() => saveLab(modal)}
        />
      )}

      {modal === "delete" && selected && (
        <LabDeleteModal
          lab={selected}
          onClose={closeModal}
          onDelete={removeLab}
        />
      )}
    </div>
  );
}
