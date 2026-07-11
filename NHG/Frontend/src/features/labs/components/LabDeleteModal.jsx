export default function LabDeleteModal({ lab, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-[#002325]">Delete Lab Account</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-900">
            {[lab.firstName, lab.lastName].filter(Boolean).join(" ") ||
              lab.email ||
              "this lab"}
          </span>
          ?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
