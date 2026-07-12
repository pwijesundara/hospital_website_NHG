import { useState } from "react";
import { createLabReportByPhone } from "../services/labService";
import LabReportForm from "./LabReportForm";

const EMPTY_REPORT_FORM = {
  patientPhoneNumber: "",
  description: "",
  report: null,
};

export default function LabReportCreatePortal() {
  const [form, setForm] = useState(EMPTY_REPORT_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const change = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setError("");
    setSuccess("");
  };

  const submitReport = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.patientPhoneNumber.trim()) {
      setError("Patient phone number is required.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!form.report) {
      setError("Please choose a PDF report.");
      return;
    }

    try {
      setSubmitting(true);
      await createLabReportByPhone({
        patientPhoneNumber: form.patientPhoneNumber.trim(),
        description: form.description.trim(),
        report: form.report,
      });
      setSuccess("Lab report added successfully.");
      setForm(EMPTY_REPORT_FORM);
    } catch (err) {
      setError(err.message || "Failed to add lab report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Laboratory Reports
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#002325]">
          Add Lab Report
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Upload a PDF report and connect it to a patient by phone number.
        </p>
      </div>

      <LabReportForm
        error={error}
        form={form}
        loading={submitting}
        onChange={change}
        onFileChange={(file) => change("report", file)}
        onSubmit={submitReport}
        submitLabel="Create Report"
        success={success}
      />
    </div>
  );
}
