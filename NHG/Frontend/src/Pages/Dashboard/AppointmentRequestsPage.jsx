import { useCallback, useEffect, useState } from "react";
import { CalendarDays, Check, Clock, MapPin, Stethoscope, X } from "lucide-react";
import {
  acceptAppointmentRequest,
  getConsultantAppointmentRequests,
  getPatientAppointmentRequests,
  removeAppointmentRequest,
} from "../../Services/appointmentService";
import { getAuthData, ROLE } from "../../Utils/auth";

const getAuthPatientId = (authData) =>
  authData?.patientId || authData?.patientID || authData?.id || authData?.userId || "";

const getAuthConsultantId = (authData) =>
  authData?.consultantId || authData?.consultantID || authData?.id || authData?.userId || "";

const asArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const formatDateTime = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const formatTime = (value) => (value ? String(value).slice(0, 5) : "--:--");

const statusClasses = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  ACCEPTED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  REMOVED: "border-red-200 bg-red-50 text-red-700",
};

export default function AppointmentRequestsPage() {
  const authData = getAuthData();
  const isConsultant = authData?.role === ROLE.CONSULTANT;
  const patientId = getAuthPatientId(authData);
  const consultantId = getAuthConsultantId(authData);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState(isConsultant ? "PENDING" : "");
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchRequests = useCallback(async () => {
    const ownerId = isConsultant ? consultantId : patientId;

    if (!ownerId) {
      setRequests([]);
      setError(
        isConsultant
          ? "Consultant account details are missing from your login session."
          : "Patient account details are missing from your login session."
      );
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = isConsultant
        ? await getConsultantAppointmentRequests(consultantId, statusFilter)
        : await getPatientAppointmentRequests(patientId);
      setRequests(asArray(data));
    } catch (err) {
      setRequests([]);
      setError(err.message || "Failed to load appointment requests.");
    } finally {
      setLoading(false);
    }
  }, [consultantId, isConsultant, patientId, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchRequests, 0);
    return () => clearTimeout(timer);
  }, [fetchRequests]);

  const handleAction = async (requestId, action) => {
    if (!consultantId) {
      setError("Consultant account details are missing from your login session.");
      return;
    }

    try {
      setActionLoadingId(`${action}-${requestId}`);
      setError("");
      setSuccess("");
      if (action === "accept") {
        await acceptAppointmentRequest({ requestId, consultantId });
        setSuccess("Appointment request accepted.");
      } else {
        await removeAppointmentRequest({ requestId, consultantId });
        setSuccess("Appointment request removed.");
      }
      await fetchRequests();
    } catch (err) {
      setError(err.message || `Failed to ${action} appointment request.`);
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Appointment Requests
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[#002325]">
            {isConsultant ? "Assigned Appointment Requests" : "My Appointment Requests"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {isConsultant
              ? "Review requests automatically assigned through your clinic sessions."
              : "Track appointment requests submitted from your patient account."}
          </p>
        </div>

        {isConsultant && (
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            {[
              ["PENDING", "Pending"],
              ["", "All"],
            ].map(([value, label]) => (
              <button
                key={label}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={`rounded-md px-4 py-2 text-xs font-bold transition ${
                  statusFilter === value
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
          Loading appointment requests...
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
          No appointment requests found.
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <article
              key={request.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      {request.clinicName || "Clinic session"}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {isConsultant
                        ? `Patient: ${request.patientName || "-"}`
                        : `Consultant: ${request.consultantName || "-"}`}
                    </p>
                    {isConsultant && request.patientEmail && (
                      <p className="mt-1 text-xs text-slate-400">
                        {request.patientEmail}
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${
                    statusClasses[request.status] ||
                    "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  {request.status || "PENDING"}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-slate-400" />
                  {request.clinicDate || "No date"}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-slate-400" />
                  {formatTime(request.startTime)} - {formatTime(request.endTime)}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-slate-400" />
                  {request.location || "No location"}
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Request Description
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {request.description || request.reason || "-"}
                </p>
                {request.sessionDescription && (
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Session: {request.sessionDescription}
                  </p>
                )}
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Requested: {formatDateTime(request.requestedAt)}
                {request.acceptedAt ? ` | Accepted: ${formatDateTime(request.acceptedAt)}` : ""}
                {request.removedAt ? ` | Removed: ${formatDateTime(request.removedAt)}` : ""}
              </p>

              {isConsultant && request.status === "PENDING" && (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => handleAction(request.id, "remove")}
                    disabled={Boolean(actionLoadingId)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <X size={14} />
                    {actionLoadingId === `remove-${request.id}` ? "Removing..." : "Remove"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(request.id, "accept")}
                    disabled={Boolean(actionLoadingId)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <Check size={14} />
                    {actionLoadingId === `accept-${request.id}` ? "Accepting..." : "Accept"}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
