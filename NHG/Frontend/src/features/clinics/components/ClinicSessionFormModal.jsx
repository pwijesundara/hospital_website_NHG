import ClinicModal, { Field } from "./ClinicModal";
import { getEntityId, inputCls } from "./clinicUtils";

export default function ClinicSessionFormModal({
  mode,
  form,
  clinics,
  errors,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <ClinicModal title={mode === "create" ? "Add Clinic Session" : "Edit Clinic Session"} onClose={onClose}>
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Clinic" error={errors.clinicId}>
            <select
              className={inputCls(errors.clinicId)}
              value={form.clinicId}
              onChange={(event) => onChange("clinicId", event.target.value)}
            >
              <option value="">Select clinic</option>
              {clinics.map((clinic) => (
                <option key={getEntityId(clinic)} value={getEntityId(clinic)}>
                  {clinic.clinicName}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Date">
          <input
            type="date"
            className={inputCls()}
            value={form.clinicDate}
            onChange={(event) => onChange("clinicDate", event.target.value)}
          />
        </Field>
        <Field label="Maximum Patients" error={errors.maximumPatients}>
          <input
            type="number"
            min="1"
            className={inputCls(errors.maximumPatients)}
            value={form.maximumPatients}
            onChange={(event) => onChange("maximumPatients", event.target.value)}
            placeholder="30"
          />
        </Field>
        <Field label="Start Time">
          <input
            type="time"
            className={inputCls()}
            value={form.startTime}
            onChange={(event) => onChange("startTime", event.target.value)}
          />
        </Field>
        <Field label="End Time">
          <input
            type="time"
            className={inputCls()}
            value={form.endTime}
            onChange={(event) => onChange("endTime", event.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Location">
            <input
              className={inputCls()}
              value={form.location}
              onChange={(event) => onChange("location", event.target.value)}
              placeholder="Room 101"
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea
              className={`${inputCls()} min-h-24 resize-none`}
              value={form.description}
              onChange={(event) => onChange("description", event.target.value)}
              placeholder="Morning cardiology clinic session"
            />
          </Field>
        </div>
      </div>
      <div className="flex gap-3 px-5 pb-5">
        <button onClick={onClose} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600">
          Cancel
        </button>
        <button onClick={onSubmit} className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600">
          {mode === "create" ? "Add Session" : "Save Changes"}
        </button>
      </div>
    </ClinicModal>
  );
}
