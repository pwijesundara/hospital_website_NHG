import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock, Mail, MapPin, Stethoscope, UserRound } from "lucide-react";
import { getDoctorAcceptedAppointmentRequests } from "../../appointments/services/appointmentService";
import { getAuthData } from "../../../shared/utils/auth";

const getAuthDoctorId = (authData) =>
  authData?.doctorId || authData?.doctorID || authData?.id || authData?.userId || "";

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

const getClinicKey = (request) =>
  String(request.clinicId || request.clinicName || "unknown-clinic");

const getSessionKey = (request) =>
  String(
    request.clinicSessionId ||
      `${request.clinicDate || "no-date"}-${request.startTime || "no-start"}-${request.endTime || "no-end"}`
  );

const groupRequestsByClinic = (requests) => {
  const clinicMap = new Map();

  requests.forEach((request) => {
    const clinicKey = getClinicKey(request);
    if (!clinicMap.has(clinicKey)) {
      clinicMap.set(clinicKey, {
        id: clinicKey,
        clinicName: request.clinicName || "Clinic",
        sessions: new Map(),
        patientCount: 0,
      });
    }

    const clinic = clinicMap.get(clinicKey);
    const sessionKey = getSessionKey(request);
    if (!clinic.sessions.has(sessionKey)) {
      clinic.sessions.set(sessionKey, {
        id: sessionKey,
        clinicDate: request.clinicDate,
        startTime: request.startTime,
        endTime: request.endTime,
        location: request.location,
        sessionDescription: request.sessionDescription,
        patients: [],
      });
    }

    clinic.sessions.get(sessionKey).patients.push(request);
    clinic.patientCount += 1;
  });

  return Array.from(clinicMap.values()).map((clinic) => ({
    ...clinic,
    sessions: Array.from(clinic.sessions.values()),
  }));
};

export default function DoctorSessionPatientsPage() {
  const authData = getAuthData();
  const doctorId = getAuthDoctorId(authData);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const groupedClinics = useMemo(() => groupRequestsByClinic(requests), [requests]);

  const fetchSessionPatients = useCallback(async () => {
    if (!doctorId) {
      setRequests([]);
      setError("Doctor account details are missing from your login session.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getDoctorAcceptedAppointmentRequests(doctorId);
      setRequests(asArray(data));
    } catch (err) {
      setRequests([]);
      setError(err.message || "Failed to load session patients.");
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    const timer = setTimeout(fetchSessionPatients, 0);
    return () => clearTimeout(timer);
  }, [fetchSessionPatients]);

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Session Patients
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#002325]">
          Accepted Session Patients
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          View patients coming for accepted appointments in your assigned clinic sessions.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
          Loading session patients...
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
          No accepted session patients found.
        </div>
      ) : (
        <div className="space-y-6">
          {groupedClinics.map((clinic) => (
            <section
              key={clinic.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#002325]">
                      {clinic.clinicName}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {clinic.sessions.length} session(s), {clinic.patientCount} accepted patient(s)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-5">
                {clinic.sessions.map((session) => (
                  <div key={session.id} className="rounded-lg bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={15} className="text-slate-400" />
                            {session.clinicDate || "No date"}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={15} className="text-slate-400" />
                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={15} className="text-slate-400" />
                            {session.location || "No location"}
                          </div>
                        </div>
                        {session.sessionDescription && (
                          <p className="mt-3 text-xs leading-5 text-slate-500">
                            {session.sessionDescription}
                          </p>
                        )}
                      </div>
                      <span className="w-fit rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-emerald-700">
                        {session.patients.length} patient(s)
                      </span>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
                      {session.patients.map((request) => (
                        <div
                          key={request.id}
                          className="grid gap-3 border-b border-slate-100 p-4 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto]"
                        >
                          <div className="flex gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                              <UserRound size={17} />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {request.patientName || "Patient"}
                              </p>
                              {request.patientEmail && (
                                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                  <Mail size={13} /> {request.patientEmail}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Request Reason
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">
                              {request.description || request.reason || "-"}
                            </p>
                          </div>

                          <div className="text-left lg:text-right">
                            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                              {request.status || "ACCEPTED"}
                            </span>
                            <p className="mt-2 text-xs text-slate-400">
                              Accepted: {formatDateTime(request.acceptedAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
