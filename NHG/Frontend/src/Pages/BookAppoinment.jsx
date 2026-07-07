import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// ── Data ────────────────────────────────────────────────────────────────────
// comment
const departments = [
  { value: "",          label: "Select department" },
  { value: "emergency",    label: "Emergency & Critical Care" },
  { value: "cardiology",   label: "Cardiology" },
  { value: "neurology",    label: "Neurology" },
  { value: "surgery",      label: "Surgery" },
  { value: "obgyn",        label: "Obstetrics & Gynaecology" },
  { value: "paediatrics",  label: "Paediatrics" },
  { value: "medicine",     label: "Internal Medicine" },
  { value: "ortho",        label: "Orthopaedics" },
  { value: "ent",          label: "ENT" },
  { value: "ophthalmology",label: "Ophthalmology" },
  { value: "radiology",    label: "Radiology & Diagnostics" },
  { value: "dermatology",  label: "Dermatology" },
  { value: "psychiatry",   label: "Psychiatry" },
  { value: "dental",       label: "Dental & Oral Health" },
];

const doctorsByDept = {
  cardiology:     ["Dr. Kasun Wickramasinghe", "Dr. Meera Krishnamurthy"],
  neurology:      ["Dr. Ranjith Fernando", "Dr. Ananthi Navaratnam"],
  surgery:        ["Dr. Chaminda Jayasuriya", "Dr. Tharaka Mendis", "Dr. Kavitha Balasundaram"],
  obgyn:          ["Dr. Sandya Abeysekera", "Dr. Usha Rajagopal"],
  paediatrics:    ["Dr. Dilhani Gunasekara", "Dr. Santhosh Ponnusamy"],
  medicine:       ["Dr. Rohan Dissanayake", "Dr. Lalitha Subramaniam", "Dr. Asanka Ratnaweera"],
  ortho:          ["Dr. Kavitha Balasundaram", "Dr. Pradeep Senanayake"],
  ent:            ["Dr. Janaka Bandara", "Dr. Nirmala Suresh"],
  ophthalmology: ["Dr. Shanti Perumal", "Dr. Gayan Ekanayake"],
  radiology:      ["Dr. Mahesh Karunanayake", "Dr. Vijaya Thilakasiri"],
  dermatology:   ["Dr. Renuka Jayawardena"],
  psychiatry:    ["Dr. Saman Samaraweera", "Dr. Preethi Wijesekara"],
  dental:        ["Dr. Amara Gunawardena", "Dr. Niluka Dias"],
  emergency:     ["Dr. Priya Ratnayake", "Dr. Arjun Sivakumar"],
};

const appointmentTypes = [
  { value: "opd",        label: "OPD Consultation",    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,         desc: "General outpatient visit with a doctor" },
  { value: "specialist",   label: "Specialist Clinic",     icon: <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M20 8v6M23 11h-6M9 7a4 4 0 100-8 4 4 0 000 8z" />,    desc: "Scheduled specialist appointment" },
  { value: "followup",     label: "Follow-up Visit",       icon: <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />,       desc: "Continuing care after a previous visit" },
  { value: "procedure",    label: "Procedure / Test",      icon: <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />,          desc: "Scheduled diagnostic or minor procedure" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30",
];

const prefLangs = ["English", "Sinhala", "Tamil"];

// ── Inline SVGs Core Helpers ────────────────────────────────────────────────
const IconWrapper = ({ children, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

// ── Shared UI Tailwind Bases ────────────────────────────────────────────────
const inputBase =
  "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all";

const labelBase = "block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5";

function Field({ label, hint, required, children }) {
  return (
    <div className="flex flex-col">
      <label className={labelBase}>
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] font-medium text-slate-400 mt-1.5 leading-normal">{hint}</p>}
    </div>
  );
}

function SectionHeader({ icon, color, title }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
      <div className={`w-8 h-8 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0 border border-current/10 shadow-sm`}>
        <IconWrapper className={color.icon} size={16}>{icon}</IconWrapper>
      </div>
      <p className="text-sm font-extrabold tracking-tight text-slate-900">{title}</p>
    </div>
  );
}

// ── Component Main Layout ───────────────────────────────────────────────────
export default function BookAppointment() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "", gender: "", nic: "",
    phone: "", email: "", address: "",
    type: "", department: "", doctor: "", date: "", time: "",
    reason: "", existing: "no", referral: "no", referralDoc: "",
    lang: "English", consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [refNo] = useState(() => "NHG-" + Math.floor(100000 + Math.random() * 900000));

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const doctors = form.department ? (doctorsByDept[form.department] || []) : [];

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Success state screen ──
  if (submitted) {
    return (
      <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-12 w-full flex-1 flex items-center justify-center">
          <div className="max-w-xl w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center mb-4 text-emerald-600 shadow-sm">
              <IconWrapper size={28}><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" /></IconWrapper>
            </div>
            
            <div className="mb-6">
              <p className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase mb-1 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md inline-block">Request Logged Successfully</p>
              <h2 className="text-xl font-black tracking-tight text-slate-900 mt-2 mb-1.5">Confirmation Awaiting Review</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Your parameters match standard submission paths. A secure validation SMS dispatch is scheduled for <strong>+94 {form.phone}</strong> following administrative desk lookups.
              </p>
            </div>

            <div className="w-full bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-left space-y-2.5 mb-6 shadow-inner">
              <div className="flex justify-between text-xs pb-2 border-b border-slate-200/40">
                <span className="text-slate-400 font-medium">Registry Tracking reference</span>
                <span className="font-mono font-bold text-slate-900 tracking-wider">{refNo}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Target Stream</span>
                <span className="font-semibold text-slate-800">{departments.find(d => d.value === form.department)?.label || "—"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Assigned Windows</span>
                <span className="font-semibold text-slate-800">{form.date || "—"} @ {form.time || "—"}</span>
              </div>
            </div>

            <p className="text-[10px] font-medium text-slate-400 mb-6 flex items-center gap-1.5">
              <IconWrapper size={12} className="text-slate-300"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></IconWrapper>
              Central Verification Line Desk: 091 222 2261
            </p>
            
            <button
              onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", dob: "", gender: "", nic: "", phone: "", email: "", address: "", type: "", department: "", doctor: "", date: "", time: "", reason: "", existing: "no", referral: "no", referralDoc: "", lang: "English", consent: false }); }}
              className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 shadow-md transition-all active:scale-98"
            >
              Allocate New Session Record
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Core Workspace UI Form ──
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-teal-700 selection:text-white antialiased">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Brand Hero Context Banner */}
        <div className="flex flex-col md:flex-row items-start gap-4 bg-gradient-to-br from-slate-900 to-teal-950 border border-slate-800 rounded-2xl p-6 mb-6 shadow-lg text-white">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400">
            <IconWrapper size={22}><path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" /></IconWrapper>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-teal-400 uppercase mb-1">National Tertiary Teaching Complex</p>
            <h1 className="text-xl font-black tracking-tight mb-2">Outpatient & Specialist Scheduling Engine</h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed font-medium">
              Populate target metrics to access professional medical streams. Registry operators process transactions systematically against real-time queue caps within one business window.
            </p>
          </div>
        </div>

        {/* Urgent Emergency Bypass Banner */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-3 mb-8 shadow-sm">
          <span className="text-amber-500 flex-shrink-0 mt-0.5">
            <IconWrapper size={16}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" /></IconWrapper>
          </span>
          <p className="text-xs font-semibold text-amber-900 leading-relaxed">
            Critical Triage Gate: If facing localized chest discomfort, acute respiratory restrictions, or profound trauma paths, do NOT log electronic queue files. Divert immediately to the Trauma Unit complex floor or initiate <strong>1990 Emergency response lines</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SECTION 1: Personal Demographic Records */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />}
              color={{ bg: "bg-teal-50", icon: "text-teal-700" }}
              title="1. Personal Demographic Records"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First name" required>
                <input type="text" value={form.firstName} onChange={set("firstName")} placeholder="Kasun" required className={inputBase} />
              </Field>
              <Field label="Last name" required>
                <input type="text" value={form.lastName} onChange={set("lastName")} placeholder="Perera" required className={inputBase} />
              </Field>
              <Field label="Date of birth" required>
                <input type="date" value={form.dob} onChange={set("dob")} required className={inputBase} />
              </Field>
              <Field label="Gender identity" required>
                <select value={form.gender} onChange={set("gender")} required className={inputBase}>
                  <option value="">Select gender alignment</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Omit verification parameter</option>
                </select>
              </Field>
              <Field label="National ID (NIC) / Passport Reference" required hint="Used to extract existing electronic history files smoothly from centralized clinical logs.">
                <input type="text" value={form.nic} onChange={set("nic")} placeholder="e.g. 199012345678" required className={inputBase} />
              </Field>
              <Field label="Primary Contact Mobile Stream" required hint="Critical token gate. Session tracking tokens route here.">
                <div className="flex gap-2 relative">
                  <span className="flex items-center px-3 border border-slate-200 rounded-xl bg-slate-100 text-xs font-bold text-slate-500 select-none shadow-inner">+94</span>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="77 123 4567" required className={inputBase} />
                </div>
              </Field>
              <Field label="Electronic Mail (Email)" hint="Optional. Alternative diagnostic summary dispatch routing endpoint.">
                <input type="email" value={form.email} onChange={set("email")} placeholder="kasun.perera@example.com" className={inputBase} />
              </Field>
              <Field label="Residential Boundary Address" hint="District bounds classification matches core scheduling zones.">
                <input type="text" value={form.address} onChange={set("address")} placeholder="Galle, Southern Province" className={inputBase} />
              </Field>
            </div>
          </div>

          {/* SECTION 2: Allocation Matrix */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 01-2-2h5l2 3h9a2 2 0 012 2z" />}
              color={{ bg: "bg-blue-50", icon: "text-blue-700" }}
              title="2. Allocation Target Matrix"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointmentTypes.map((t) => {
                const isSelected = form.type === t.value;
                return (
                  <label
                    key={t.value}
                    className={`flex items-start gap-3.5 border rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/10"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio" name="appt-type" value={t.value}
                      checked={isSelected} onChange={set("type")}
                      className="mt-1 accent-teal-700 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <IconWrapper className={isSelected ? "text-teal-700" : "text-slate-400"} size={14}>{t.icon}</IconWrapper>
                        <p className="text-xs font-bold text-slate-900">{t.label}</p>
                      </div>
                      <p className="text-[11px] font-medium text-slate-400 mt-1 leading-normal">{t.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Clinical Desk Routing */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={<path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5M12 13a5 5 0 100-10 5 5 0 000 10z" />}
              color={{ bg: "bg-purple-50", icon: "text-purple-700" }}
              title="3. Clinical Desk Routing"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Clinical Focus Stream" required>
                <select
                  value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value, doctor: "" }))}
                  required className={inputBase}
                >
                  {departments.map((d) => (
                    <option key={d.value} value={d.value} disabled={d.value === "" && form.department !== ""}>{d.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred Consultant Desk" hint="Toggle department selector above to initialize specific active officer lists.">
                <select value={form.doctor} onChange={set("doctor")} className={inputBase} disabled={!form.department}>
                  <option value="">No preference (Assign open tracking path)</option>
                  {doctors.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* SECTION 4: Time-Space Parameters */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />}
              color={{ bg: "bg-amber-50", icon: "text-amber-600" }}
              title="4. Time-Space Parameters"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field label="Target Calendar Date" required hint="Standard clinics operate Monday through Saturday.">
                <input
                  type="date" value={form.date} onChange={set("date")}
                  min={new Date().toISOString().split("T")[0]}
                  required className={inputBase}
                />
              </Field>
              <Field label="Preferred Queue Block Slot" required>
                <select value={form.time} onChange={set("time")} required className={inputBase}>
                  <option value="">Select target session time</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>{t} hrs</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Primary Consultation Dialect">
              <div className="flex gap-2 flex-wrap mt-1">
                {prefLangs.map((l) => {
                  const isActive = form.lang === l;
                  return (
                    <label
                      key={l}
                      className={`flex items-center justify-center px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        isActive
                          ? "border-teal-500 bg-teal-50 text-teal-800 shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio" name="lang" value={l}
                        checked={isActive} onChange={set("lang")}
                        className="sr-only"
                      />
                      {l}
                    </label>
                  );
                })}
              </div>
            </Field>
          </div>

          {/* SECTION 5: Treatment Context & Diagnostics */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8M16 17H8" />}
              color={{ bg: "bg-emerald-50", icon: "text-emerald-700" }}
              title="5. Contextual Medical Indicators"
            />
            <div className="space-y-5">
              <Field label="Reason for Session Allocation" required hint="Provide short outline of symptoms or specific referral indications clearly.">
                <textarea
                  value={form.reason} onChange={set("reason")}
                  rows={3} required
                  placeholder="Describe presentation logs (e.g. Chronic joint stiffness noticed during morning cycles, localized swelling over left knee base)..."
                  className={`${inputBase} resize-none leading-relaxed`}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Prior Institutional Tracking?" hint="Have you generated historical medical profiles inside NHG bounds previously?">
                  <div className="flex gap-3 mt-1">
                    {["yes", "no"].map((v) => {
                      const isChecked = form.existing === v;
                      return (
                        <label key={v} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer flex-1 transition-all justify-center ${
                          isChecked ? "border-teal-500 bg-teal-50 text-teal-800 shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}>
                          <input type="radio" name="existing" value={v} checked={isChecked} onChange={set("existing")} className="accent-teal-700" />
                          {v === "yes" ? "Yes, Return Profile" : "No, New Baseline"}
                        </label>
                      );
                    })}
                  </div>
                </Field>

                <Field label="External Officer Referral?" hint="Are parameters requested by independent healthcare practitioners?">
                  <div className="flex gap-3 mt-1">
                    {["yes", "no"].map((v) => {
                      const isChecked = form.referral === v;
                      return (
                        <label key={v} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer flex-1 transition-all justify-center ${
                          isChecked ? "border-teal-500 bg-teal-50 text-teal-700 shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}>
                          <input type="radio" name="referral" value={v} checked={isChecked} onChange={set("referral")} className="accent-teal-700" />
                          {v === "yes" ? "Yes, Documented" : "No"}
                        </label>
                      );
                    })}
                  </div>
                </Field>
              </div>

              {form.referral === "yes" && (
                <Field label="Referring Medical Practitioner & Outpost Hub Info">
                  <input
                    type="text" value={form.referralDoc} onChange={set("referralDoc")}
                    placeholder="Dr. Silva, Matara General Hospital complex floor"
                    className={inputBase}
                  />
                </Field>
              )}
            </div>
          </div>

          {/* Legal Clearances & Action Trigger */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <label className="flex items-start gap-3 cursor-pointer p-1">
              <input
                type="checkbox" checked={form.consent} onChange={set("consent")}
                required className="mt-1 accent-teal-700 w-4 h-4 flex-shrink-0 cursor-pointer"
              />
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                I attest that the logged parameters correspond truthfully to the identity reference metrics. I explicitly acknowledge that this submission marks a queue allocation <strong>request</strong> pending administrative desk lookups, and that final slots depend on live tracking capacity bounds according to Sri Lanka National Health Data governance standards.
              </p>
            </label>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                <IconWrapper size={12} className="text-slate-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></IconWrapper>
                End-to-End Secure Health Records Transaction Architecture
              </p>
              <button
                type="submit"
                disabled={!form.consent}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all active:scale-98"
              >
                <IconWrapper size={14}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8" /></IconWrapper>
                Transmit Session Request
              </button>
            </div>
          </div>

          {/* Interactive Help Desk Strip */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <p className="text-xs font-black tracking-tight mb-0.5">Experiencing parameter mapping friction?</p>
              <p className="text-[11px] font-medium text-slate-400">Connect with local administrative line operators directly. Multi-lingual operations enabled.</p>
            </div>
            <div className="flex items-center gap-2 border border-slate-800 bg-slate-950 px-4 py-2 rounded-xl text-teal-400 font-mono text-xs font-bold shadow-inner">
              <IconWrapper size={14}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></IconWrapper>
              091 222 2261 · Desk Ext. 1
            </div>
          </div>

        </form>
      </div>
      <Footer />
    </div>
  );
}