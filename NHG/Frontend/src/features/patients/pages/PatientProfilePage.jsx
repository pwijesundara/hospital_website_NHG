import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Calendar,
  Droplets,
  HeartPulse,
  Home,
  IdCard,
  Mail,
  Phone,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import { getAuthData } from "../../../shared/utils/auth";
import { getPatientById } from "../services/patientService";

const getAuthPatientId = (authData) =>
  authData?.patientId ||
  authData?.patientID ||
  authData?.id ||
  authData?.userId ||
  "";

const getDisplayValue = (value) => value || "Not provided";

function DetailCard({ icon: Icon, label, value, tone = "teal" }) {
  const toneClass =
    tone === "amber"
      ? "bg-amber-50 text-amber-700 ring-amber-100"
      : "bg-teal-50 text-teal-700 ring-teal-100";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${toneClass}`}
        >
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>
          <p className="mt-1 break-words text-sm font-semibold text-slate-800">
            {getDisplayValue(value)}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-[#002325]">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </section>
  );
}

export default function PatientProfilePage() {
  const [authData] = useState(() => getAuthData());
  const patientId = getAuthPatientId(authData);
  const [profile, setProfile] = useState(authData || {});
  const [loading, setLoading] = useState(Boolean(patientId));
  const [error, setError] = useState("");

  const loadProfile = useCallback(async () => {
    if (!patientId) {
      setLoading(false);
      setError("Patient account details are missing from your login session.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getPatientById(patientId);
      setProfile(data?.data || data?.patient || data || authData || {});
    } catch (err) {
      setError(err.message || "Failed to load full patient profile.");
      setProfile(authData || {});
    } finally {
      setLoading(false);
    }
  }, [authData, patientId]);

  useEffect(() => {
    const timer = setTimeout(loadProfile, 0);
    return () => clearTimeout(timer);
  }, [loadProfile]);

  const fullName = useMemo(
    () =>
      [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
      profile.name ||
      "My Profile",
    [profile]
  );

  return (
    <div className="space-y-8 text-slate-800">
      <div className="overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-800 text-white shadow-xl shadow-teal-950/10">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <UserRound size={30} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                  Patient Profile
                </p>
                <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  {fullName}
                </h1>
                <p className="mt-1 text-sm text-white/70">
                  View your registered hospital profile details.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15">
              {loading ? "Loading profile..." : "Secure patient record"}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {error}
        </div>
      )}

      <Section title="Personal Details">
        <DetailCard icon={UserRound} label="Full Name" value={fullName} />
        <DetailCard icon={IdCard} label="NIC" value={profile.nic} />
        <DetailCard icon={Calendar} label="Date of Birth" value={profile.dob} />
        <DetailCard icon={Droplets} label="Blood Group" value={profile.bloodGroup} tone="amber" />
      </Section>

      <Section title="Contact Details">
        <DetailCard icon={Phone} label="Mobile" value={profile.mobile || profile.phone || profile.phoneNumber} />
        <DetailCard icon={Mail} label="Email" value={profile.email} />
        <DetailCard icon={Home} label="Address" value={profile.address} />
      </Section>

      <Section title="Medical Details">
        <DetailCard icon={Phone} label="Emergency Contact" value={profile.emergencyContact} tone="amber" />
        <DetailCard icon={ShieldAlert} label="Allergies" value={profile.allergies} tone="amber" />
        <DetailCard icon={Activity} label="Height" value={profile.height ? `${profile.height} cm` : ""} />
        <DetailCard icon={HeartPulse} label="Weight" value={profile.weight ? `${profile.weight} kg` : ""} />
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:col-span-2 xl:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Medical History
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {getDisplayValue(profile.medicalHistory)}
          </p>
        </div>
      </Section>
    </div>
  );
}
