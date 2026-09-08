import { useCallback, useEffect, useMemo, useState } from "react";
import { Building2, ChevronDown, ChevronRight, Mail, Search, UserRound } from "lucide-react";
import { getDoctorAcceptedAppointmentRequests } from "../../appointments/services/appointmentService";
import { getAuthData } from "../../../shared/utils/auth";
import DoctorPatientReports from "../../labs/components/DoctorPatientReports";

const getAuthDoctorId = (authData) =>
  authData?.doctorId || authData?.doctorID || authData?.id || authData?.userId || "";

const asArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const dedupePatients = (requests) => {
  const patientMap = new Map();

  requests.forEach((request) => {
    if (request.patientId == null) return;

    if (!patientMap.has(request.patientId)) {
      patientMap.set(request.patientId, {
        patientId: request.patientId,
        patientName: request.patientName || "Patient",
        patientEmail: request.patientEmail || "",
        clinics: new Set(),
        lastAcceptedAt: request.acceptedAt || null,
      });
    }

    const patient = patientMap.get(request.patientId);
    if (request.clinicName) patient.clinics.add(request.clinicName);
    if (
      request.acceptedAt &&
      (!patient.lastAcceptedAt || request.acceptedAt > patient.lastAcceptedAt)
    ) {
      patient.lastAcceptedAt = request.acceptedAt;
    }
  });

  return Array.from(patientMap.values())
    .map((patient) => ({ ...patient, clinics: Array.from(patient.clinics) }))
    .sort((a, b) => a.patientName.localeCompare(b.patientName));
};

export default function DoctorPatientReportsPage() {
  const authData = getAuthData();
  const doctorId = getAuthDoctorId(authData);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [expandedPatients, setExpandedPatients] = useState(() => new Set());

  const fetchAcceptedPatients = useCallback(async () => {
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
      setError(err.message || "Failed to load patients.");
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    const timer = setTimeout(fetchAcceptedPatients, 0);
    return () => clearTimeout(timer);
  }, [fetchAcceptedPatients]);

  const patients = useMemo(() => dedupePatients(requests), [requests]);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return patients;
    return patients.filter(
      (patient) =>
        patient.patientName.toLowerCase().includes(query) ||
        patient.patientEmail.toLowerCase().includes(query)
    );
  }, [patients, search]);

  const togglePatient = (patientId) => {
    setExpandedPatients((prev) => {
      const next = new Set(prev);
      if (next.has(patientId)) next.delete(patientId);
      else next.add(patientId);
      return next;
    });
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Patient Reports
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#002325]">
          Lab Reports of My Patients
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          View lab reports for patients who are registered to your clinic sessions
          through an accepted appointment.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="relative max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search patients by name or email"
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300"
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
          Loading patients...
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
          {patients.length === 0
            ? "No patients are registered to your clinic sessions yet."
            : "No patients match your search."}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPatients.map((patient) => {
            const expanded = expandedPatients.has(patient.patientId);
            return (
              <section
                key={patient.patientId}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => togglePatient(patient.patientId)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <UserRound size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {patient.patientName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        {patient.patientEmail && (
                          <span className="flex items-center gap-1.5">
                            <Mail size={12} /> {patient.patientEmail}
                          </span>
                        )}
                        {patient.clinics.length > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Building2 size={12} /> {patient.clinics.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {expanded ? (
                    <ChevronDown size={18} className="shrink-0 text-slate-400" />
                  ) : (
                    <ChevronRight size={18} className="shrink-0 text-slate-400" />
                  )}
                </button>

                {expanded && (
                  <div className="border-t border-slate-100 bg-slate-50/70 p-4">
                    <DoctorPatientReports
                      doctorId={doctorId}
                      patientId={patient.patientId}
                    />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
