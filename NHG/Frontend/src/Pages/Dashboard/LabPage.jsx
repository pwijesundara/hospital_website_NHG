import { useCallback, useEffect, useMemo, useState } from "react";
import LabAdminHeader from "../../Components/Lab/LabAdminHeader";
import LabDeleteModal from "../../Components/Lab/LabDeleteModal";
import LabModal from "../../Components/Lab/LabModal";
import LabStats from "../../Components/Lab/LabStats";
import LabTable from "../../Components/Lab/LabTable";
import PatientLabPortal from "../../Components/Lab/PatientLabPortal";
import {
  asArray,
  buildLabPayload,
  buildLabUserPayload,
  EMPTY_LAB_FORM,
  getLabId,
  validateLabForm,
} from "../../Components/Lab/labUtils";
import {
  createLab,
  deleteLab,
  getAllLabs,
  updateLab,
} from "../../Services/labService";
import { registerLabUser } from "../../Services/authService";
import { getAuthData, ROLE } from "../../Utils/auth";

export default function LabPage() {
  const authData = getAuthData();
  const canManageLabs = authData?.role === ROLE.ADMIN || authData?.role === ROLE.LAB;
  const canSubmitReports =
    authData?.role === ROLE.LAB || authData?.role === ROLE.PATIENT;
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
      setApiError(error.message || "Failed to load lab records.");
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
    const activeCount = labs.filter((lab) => lab.status !== "INACTIVE").length;
    return [
      ["Total Tests", labs.length],
      ["Active Tests", activeCount],
      ["Inactive Tests", labs.length - activeCount],
    ];
  }, [labs]);

  const filteredLabs = useMemo(() => {
    const query = search.toLowerCase();
    return labs.filter(
      (lab) =>
        lab.testName?.toLowerCase().includes(query) ||
        lab.category?.toLowerCase().includes(query) ||
        lab.description?.toLowerCase().includes(query)
    );
  }, [labs, search]);

  const openCreate = () => {
    setForm(EMPTY_LAB_FORM);
    setSelected(null);
    setErrors({});
    setModal("create");
  };

  const openEdit = (lab) => {
    setForm({
      testName: lab.testName || "",
      category: lab.category || "",
      price: lab.price ?? "",
      turnaroundTime: lab.turnaroundTime || "",
      status: lab.status || "ACTIVE",
      description: lab.description || "",
      firstName: "",
      lastName: "",
      nic: "",
      dob: "",
      mobile: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setSelected(lab);
    setErrors({});
    setModal("edit");
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
        await createLab(buildLabPayload(form));
      } else {
        await updateLab(getLabId(selected), buildLabPayload(form));
      }
      await fetchLabs();
      closeModal();
    } catch (error) {
      setApiError(error.message || `Failed to ${mode} lab record.`);
    }
  };

  const removeLab = async () => {
    try {
      setApiError("");
      await deleteLab(getLabId(selected));
      await fetchLabs();
      closeModal();
    } catch (error) {
      setApiError(error.message || "Failed to delete lab record.");
    }
  };

  if (canSubmitReports) {
    return <PatientLabPortal canSubmit labs={labs} />;
  }

  if (!canManageLabs) {
    return <PatientLabPortal labs={labs} />;
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
