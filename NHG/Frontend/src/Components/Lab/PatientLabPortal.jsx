import { useEffect, useState } from "react";
import {
  getLabReportsByPatientPhone,
  submitLabReport,
} from "../../Services/labService";
import { getAuthData, ROLE } from "../../Utils/auth";
import AvailableLabTests from "./AvailableLabTests";
import PatientLabUploadForm from "./PatientLabUploadForm";
import PatientLabUploadsList from "./PatientLabUploadsList";
import { asArray } from "./labUtils";

const EMPTY_REPORT_FORM = {
  patientPhoneNumber: "",
  description: "",
  report: null,
};

const getAuthPhone = (authData) =>
  authData?.mobile || authData?.phone || authData?.phoneNumber || "";

export default function PatientLabPortal({ canSubmit = false, labs }) {
  const authData = getAuthData();
  const isPatient = authData?.role === ROLE.PATIENT;
  const [reports, setReports] = useState([]);
  const [lookupPhone, setLookupPhone] = useState(getAuthPhone(authData));
  const [form, setForm] = useState({
    ...EMPTY_REPORT_FORM,
    patientPhoneNumber: getAuthPhone(authData),
  });
  const [error, setError] = useState("");
  const [lookupError, setLookupError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);

  const activeLabs = labs.filter((lab) => lab.status !== "INACTIVE");

  const fetchReports = async (phoneNumber = lookupPhone) => {
    const normalizedPhone = phoneNumber.trim();
    setLookupError("");

    if (!normalizedPhone) {
      setReports([]);
      setLookupError("Please enter a patient phone number.");
      return;
    }

    try {
      setLoadingReports(true);
      const data = await getLabReportsByPatientPhone(normalizedPhone);
      setReports(asArray(data));
      setLookupPhone(normalizedPhone);
    } catch (err) {
      setReports([]);
      setLookupError(err.message || "Failed to load lab reports.");
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    if (!lookupPhone) return;
    const timer = setTimeout(() => {
      fetchReports(lookupPhone);
    }, 0);
    return () => clearTimeout(timer);
    // Initial report load only. Manual search handles later phone changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const change = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setError("");
    setSuccess("");
  };

  const submitUpload = async (event) => {
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
      await submitLabReport({
        patientPhoneNumber: form.patientPhoneNumber.trim(),
        description: form.description.trim(),
        report: form.report,
      });
      setSuccess("Lab report submitted successfully.");
      setForm({
        ...EMPTY_REPORT_FORM,
        patientPhoneNumber: form.patientPhoneNumber.trim(),
      });
      await fetchReports(form.patientPhoneNumber);
    } catch (err) {
      setError(err.message || "Failed to submit lab report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Lab Reports
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#002325]">
          {canSubmit
            ? isPatient
              ? "Submit My Lab Report"
              : "Submit Patient Lab Reports"
            : "View Lab Reports"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          {canSubmit
            ? isPatient
              ? "Upload your PDF lab report and review submitted reports by phone number."
              : "Upload PDF lab reports and review reports by patient phone number."
            : "Enter your phone number to view submitted lab reports."}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <PatientLabUploadForm
          canSubmit={canSubmit}
          error={error}
          form={form}
          isPatient={isPatient}
          loading={submitting}
          onChange={change}
          onFileChange={(file) => change("report", file)}
          onSubmit={submitUpload}
          success={success}
        />
        <AvailableLabTests activeLabs={activeLabs} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetchReports(lookupPhone);
          }}
          className="flex flex-col gap-3 md:flex-row md:items-end"
        >
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Patient Phone Number
            </label>
            <input
              value={lookupPhone}
              onChange={(event) => setLookupPhone(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="0771234567"
            />
          </div>
          <button
            type="submit"
            disabled={loadingReports}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {loadingReports ? "Searching..." : "Get Reports"}
          </button>
        </form>
        {lookupError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {lookupError}
          </div>
        )}
      </div>

      <PatientLabUploadsList loading={loadingReports} reports={reports} />
    </div>
  );
}
