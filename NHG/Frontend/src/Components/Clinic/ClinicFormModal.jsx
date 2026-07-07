import ClinicModal, { Field } from "./ClinicModal";
import { doctorName, getEntityId, inputCls } from "./clinicUtils";

export default function ClinicFormModal({
  mode,
  form,
  doctors,
  errors,
  onChange,
  onToggleDoctor,
  onClose,
  onSubmit,
}) {
  return (
    <ClinicModal title={mode === "create" ? "Add Clinic" : "Edit Clinic"} onClose={onClose}>
      <div className="space-y-4 p-5">
        <Field label="Clinic Name" error={errors.clinicName}>
          <input
            className={inputCls(errors.clinicName)}
            value={form.clinicName}
            onChange={(event) => onChange("clinicName", event.target.value)}
            placeholder="Cardiology Clinic"
          />
        </Field>
        <Field label="Description">
          <textarea
            className={`${inputCls()} min-h-24 resize-none`}
            value={form.description}
            onChange={(event) => onChange("description", event.target.value)}
            placeholder="Heart related consultations"
          />
        </Field>
        <Field label="Doctors">
          <div className="grid max-h-48 gap-2 overflow-y-auto rounded-lg border border-slate-200 p-3 sm:grid-cols-2">
            {doctors.length === 0 ? (
              <p className="text-xs text-slate-400">No doctors available.</p>
            ) : (
              doctors.map((doctor) => {
                const doctorId = getEntityId(doctor);
                return (
                  <label key={doctorId} className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={form.doctorIds.includes(Number(doctorId))}
                      onChange={() => onToggleDoctor(doctorId)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-500"
                    />
                    <span>{doctorName(doctor)}</span>
                  </label>
                );
              })
            )}
          </div>
        </Field>
      </div>
      <div className="flex gap-3 px-5 pb-5">
        <button onClick={onClose} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600">
          Cancel
        </button>
        <button onClick={onSubmit} className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600">
          {mode === "create" ? "Add Clinic" : "Save Changes"}
        </button>
      </div>
    </ClinicModal>
  );
}
