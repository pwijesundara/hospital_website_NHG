import ClinicModal from "./ClinicModal";

export default function ClinicDeleteModal({ type, selected, onClose, onDelete }) {
  const name =
    type === "clinic"
      ? selected.clinicName
      : `${selected.clinicDate || "this session"} ${selected.location ? `at ${selected.location}` : ""}`;

  return (
    <ClinicModal title={type === "clinic" ? "Remove Clinic" : "Remove Clinic Session"} onClose={onClose}>
      <div className="p-5">
        <p className="text-sm text-slate-500">
          Are you sure you want to remove <span className="font-medium text-slate-700">{name}</span>?
        </p>
      </div>
      <div className="flex gap-3 px-5 pb-5">
        <button onClick={onClose} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600">
          Cancel
        </button>
        <button onClick={onDelete} className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600">
          Remove
        </button>
      </div>
    </ClinicModal>
  );
}

