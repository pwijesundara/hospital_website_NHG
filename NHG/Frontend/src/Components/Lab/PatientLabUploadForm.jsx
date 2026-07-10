import { Upload } from "lucide-react";
import LabField from "./LabField";

export default function PatientLabUploadForm({
  canSubmit,
  error,
  form,
  isPatient,
  loading,
  onChange,
  onFileChange,
  onSubmit,
  success,
}) {
  if (!canSubmit) return null;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <Upload size={20} />
        </div>
        <div>
          <h2 className="font-semibold text-[#002325]">
            {isPatient ? "Submit my lab report" : "Submit lab report"}
          </h2>
          <p className="text-sm text-slate-500">
            {isPatient
              ? "Upload your PDF report using your patient phone number."
              : "Upload a PDF report for a patient phone number."}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <LabField label="Patient Phone Number">
          <input
            value={form.patientPhoneNumber}
            onChange={(event) => onChange("patientPhoneNumber", event.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="0771234567"
          />
        </LabField>

        <LabField label="PDF Report">
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(event) => onFileChange(event.target.files?.[0] || null)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-emerald-700"
          />
          {form.report && (
            <p className="mt-1 text-xs text-slate-500">
              Selected: {form.report.name}
            </p>
          )}
        </LabField>

        <div className="md:col-span-2">
          <LabField label="Description">
            <textarea
              value={form.description}
              onChange={(event) => onChange("description", event.target.value)}
              className="min-h-24 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="Blood test report"
            />
          </LabField>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f6b50] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#19553f] disabled:opacity-60"
      >
        <Upload size={17} /> {loading ? "Submitting..." : "Submit Lab Report"}
      </button>
    </form>
  );
}
