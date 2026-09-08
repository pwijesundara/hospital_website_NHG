import { useCallback, useEffect, useState } from "react";
import {
  getDoctorLabReportPdf,
  getDoctorPatientLabReports,
} from "../services/labService";
import { asArray } from "./labUtils";
import PatientLabUploadsList from "./PatientLabUploadsList";

export default function DoctorPatientReports({ doctorId, patientId }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = useCallback(async () => {
    if (!doctorId || !patientId) {
      setReports([]);
      setError("Doctor or patient account details are missing.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getDoctorPatientLabReports(doctorId, patientId);
      setReports(asArray(data));
    } catch (err) {
      setReports([]);
      setError(err.message || "Failed to load lab reports.");
    } finally {
      setLoading(false);
    }
  }, [doctorId, patientId]);

  useEffect(() => {
    const timer = setTimeout(fetchReports, 0);
    return () => clearTimeout(timer);
  }, [fetchReports]);

  const downloadPdf = async (report) => {
    try {
      const pdf = await getDoctorLabReportPdf(doctorId, report.id);
      const url = URL.createObjectURL(pdf);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (err) {
      setError(err.message || "Failed to open lab report PDF.");
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <PatientLabUploadsList
        emptyMessage="No lab reports found for this patient."
        loading={loading}
        onDownloadPdf={downloadPdf}
        reports={reports}
        title="Patient Lab Reports"
      />
    </div>
  );
}
