import { FileText } from "lucide-react";

const formatSubmittedAt = (submittedAt) => {
  if (!submittedAt) return "-";
  const date = new Date(submittedAt);
  return Number.isNaN(date.getTime()) ? submittedAt : date.toLocaleString();
};

export default function PatientLabUploadsList({ loading, reports }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <h2 className="font-semibold text-[#002325]">Lab Reports</h2>
        <p className="mt-1 text-sm text-slate-500">
          {reports.length} records found
        </p>
      </div>

      {loading ? (
        <div className="px-5 py-10 text-center text-sm text-slate-500">
          Loading lab reports...
        </div>
      ) : reports.length ? (
        <div className="divide-y divide-slate-100">
          {reports.map((report) => (
            <div
              key={report.id ?? `${report.patientPhoneNumber}-${report.fileName}`}
              className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    {report.fileName || "Lab report PDF"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Phone: {report.patientPhoneNumber || "-"}
                    {report.patientId ? ` - Patient ID: ${report.patientId}` : ""}
                  </p>
                  {report.description && (
                    <p className="mt-1 text-sm text-slate-500">
                      {report.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-slate-400">
                    Submitted: {formatSubmittedAt(report.submittedAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center text-sm text-slate-500">
          No lab reports found for this phone number.
        </div>
      )}
    </div>
  );
}
