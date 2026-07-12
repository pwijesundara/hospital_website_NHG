import { useCallback, useEffect, useState } from "react";
import PatientHeader from "../components/PatientHeader";
import PatientSearch from "../components/PatientSearch";
import PatientTable from "../components/PatientTable";
import PatientModal from "../components/PatientModal";
import { registerUser } from "../../auth/services/authService";
import {
  deletePatient,
  getAllPatients,
  updatePatient,
} from "../services/patientService";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  nic: "",
  dob: "",
  address: "",
  email: "",
  mobile: "",
  bloodGroup: "",
  emergencyContact: "",
  allergies: "",
  medicalHistory: "",
  height: "",
  weight: "",
  role: "PATIENT",
};

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const fetchPatients = useCallback(async () => {
    try {
      const data = await getAllPatients();
      setPatients(Array.isArray(data) ? data : []);
      setApiError("");
    } catch (error) {
      setApiError(error.message || "Failed to fetch patients.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchPatients, 0);
    return () => clearTimeout(timer);
  }, [fetchPatients]);

  const filteredPatients = patients.filter(
    (patient) => {
      const query = search.toLowerCase();
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();

      return (
        fullName.includes(query) ||
        patient.email?.toLowerCase().includes(query) ||
        patient.nic?.toLowerCase().includes(query) ||
        patient.mobile?.toLowerCase().includes(query)
      );
    }
  );

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSelected(null);
    setModal("create");
  };

  const openEdit = (patient) => {
    setForm({ ...patient });
    setErrors({});
    setSelected(patient);
    setModal("edit");
  };

  const openDelete = (patient) => {
    setSelected(patient);
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setErrors({});
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!form.nic.trim()) nextErrors.nic = "NIC is required.";
    if (!form.dob) nextErrors.dob = "Date of birth is required.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (!form.mobile.trim()) nextErrors.mobile = "Mobile is required.";
    if (form.height && (Number.isNaN(Number(form.height)) || Number(form.height) <= 0)) {
      nextErrors.height = "Enter a valid height.";
    }
    if (form.weight && (Number.isNaN(Number(form.weight)) || Number(form.weight) <= 0)) {
      nextErrors.weight = "Enter a valid weight.";
    }

    return nextErrors;
  };

  const optionalText = (value) => value?.trim() || null;

  const buildPatientPayload = () => ({
    ...form,
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    nic: form.nic.trim(),
    address: form.address.trim(),
    email: form.email.trim(),
    mobile: form.mobile.trim(),
    bloodGroup: form.bloodGroup || null,
    emergencyContact: optionalText(form.emergencyContact),
    allergies: optionalText(form.allergies),
    medicalHistory: optionalText(form.medicalHistory),
    height: form.height ? Number(form.height) : null,
    weight: form.weight ? Number(form.weight) : null,
    role: "PATIENT",
  });

  const handleCreate = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    try {
      setApiError("");
      await registerUser(buildPatientPayload());
      await fetchPatients();
      closeModal();
    } catch (error) {
      setApiError(error.message || "Failed to register patient.");
    }
  };

  const handleUpdate = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    try {
      setApiError("");
      await updatePatient(selected.id, buildPatientPayload());
      await fetchPatients();
      closeModal();
    } catch (error) {
      setApiError(error.message || "Failed to update patient.");
    }
  };

  const handleDelete = async () => {
    try {
      setApiError("");
      await deletePatient(selected.id);
      await fetchPatients();
      closeModal();
    } catch (error) {
      setApiError(error.message || "Failed to delete patient.");
    }
  };

  const change = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    if (errors[field]) {
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <PatientHeader totalPatients={patients.length} onAdd={openCreate} />

        <PatientSearch search={search} setSearch={setSearch} />

        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {apiError}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400 shadow-sm">
            Loading patients...
          </div>
        ) : (
          <PatientTable
            patients={filteredPatients}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        )}
      </div>

      <PatientModal
        modal={modal}
        selected={selected}
        form={form}
        errors={errors}
        bloodGroups={BLOOD_GROUPS}
        onChange={change}
        onClose={closeModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
