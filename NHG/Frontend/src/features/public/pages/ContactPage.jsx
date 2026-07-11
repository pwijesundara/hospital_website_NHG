import { useState } from "react";
import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";

// ── Data ────────────────────────────────────────────────────────────────────

const departments = [
  { value: "",          label: "Select department" },
  { value: "opd",          label: "OPD & Appointments" },
  { value: "emergency",    label: "Emergency Services" },
  { value: "billing",      label: "Billing & Finance" },
  { value: "records",      label: "Medical Records" },
  { value: "pharmacy",     label: "Pharmacy" },
  { value: "bloodbank",    label: "Blood Bank" },
  { value: "welfare",      label: "Patient Welfare & Donations" },
  { value: "complaints",   label: "Complaints & Feedback" },
  { value: "media",        label: "Media & PR" },
  { value: "other",        label: "General Enquiry" },
];

const directLines = [
  {
    icon: "ti-urgent",
    color: { bg: "bg-red-50", icon: "text-red-600", badge: "bg-red-50 text-red-700 border-red-100" },
    label: "Emergency",
    number: "1990",
    sub: "24 / 7 — do not use for enquiries",
  },
  {
    icon: "ti-phone",
    color: { bg: "bg-teal-50", icon: "text-teal-700", badge: "bg-teal-50 text-teal-700 border-teal-100" },
    label: "Main Switchboard",
    number: "091 222 2261",
    sub: "Mon – Sat · 07:00 – 20:00",
  },
  {
    icon: "ti-stethoscope",
    color: { bg: "bg-blue-50", icon: "text-blue-700", badge: "bg-blue-50 text-blue-700 border-blue-100" },
    label: "OPD & Appointments",
    number: "091 222 2261 · Ext. 1",
    sub: "Mon – Sat · 07:30 – 16:00",
  },
  {
    icon: "ti-droplet-filled",
    color: { bg: "bg-red-50", icon: "text-red-600", badge: "bg-red-50 text-red-700 border-red-100" },
    label: "Blood Bank",
    number: "091 222 2261 · Ext. 3",
    sub: "Open 24 / 7",
  },
  {
    icon: "ti-receipt",
    color: { bg: "bg-amber-50", icon: "text-amber-600", badge: "bg-amber-50 text-amber-700 border-amber-100" },
    label: "Billing & Finance",
    number: "091 222 2261 · Ext. 5",
    sub: "Mon – Fri · 08:00 – 16:00",
  },
  {
    icon: "ti-heart-handshake",
    color: { bg: "bg-purple-50", icon: "text-purple-700", badge: "bg-purple-50 text-purple-700 border-purple-100" },
    label: "Patient Welfare",
    number: "welfare@nhgalle.lk",
    sub: "Mon – Fri · 08:00 – 17:00",
    isEmail: true,
  },
];

const locations = [
  {
    icon: "ti-building-hospital",
    color: { bg: "bg-teal-50", icon: "text-teal-700" },
    label: "Main Hospital",
    address: "Wackwella Road, Galle 80000\nSouthern Province, Sri Lanka",
    note: "All inpatient, surgical & emergency services",
  },
  {
    icon: "ti-map-pin",
    color: { bg: "bg-blue-50", icon: "text-blue-700" },
    label: "OPD & Clinic Block",
    address: "Entrance via Old Matara Road\nGround & First Floor",
    note: "Outpatient registration · Mon – Sat from 07:30",
  },
  {
    icon: "ti-flask",
    color: { bg: "bg-amber-50", icon: "text-amber-600" },
    label: "Laboratory & Diagnostics",
    address: "East Wing, Level 2\nMain Hospital Campus",
    note: "Sample collection · Mon – Sat · 07:00 – 18:00",
  },
];

const faqs = [
  {
    q: "How do I get a copy of my medical records?",
    a: "Visit the Medical Records unit on Level 1, Mon – Fri, 08:00 – 15:00. Bring your NIC and previous clinic card. Copies are issued within 3 working days.",
  },
  {
    q: "Can I book an appointment online?",
    a: "Yes — use our online appointment form or call the OPD helpline on 091 222 2261 Ext. 1. Walk-ins are also accepted at the OPD desk from 07:30 Mon – Sat.",
  },
  {
    q: "What languages are spoken at the hospital?",
    a: "All services are available in Sinhala, Tamil and English. Interpreter assistance is also available for patients who need it — ask at the OPD desk.",
  },
  {
    q: "Where can I submit a complaint or feedback?",
    a: "Use the enquiry form on this page and select 'Complaints & Feedback'. Alternatively, speak with the Patient Welfare Officer at Level 1 reception.",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

const inputBase =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all duration-200";

const labelBase = "block text-xs font-semibold text-gray-600 mb-1.5";

function Field({ label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-0">
      <label className={labelBase}>
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function SectionHeader({ icon, color, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className={`w-7 h-7 rounded-lg ${color.bg} flex items-center justify-center flex-shrink-0`}>
        <i className={`ti ${icon} text-base ${color.icon}`} aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", department: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Success ──
  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto px-5 py-10">
          <div className="max-w-xl mx-auto">
            <div className="bg-teal-50 border border-teal-100 rounded-xl px-6 py-8 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
                <i className="ti ti-circle-check text-3xl text-teal-700" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-teal-600 uppercase mb-1">Message Sent</p>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">We'll get back to you shortly</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Thank you, <strong>{form.name}</strong>. Your message has been received by our team. We aim to respond to all enquiries within one working day.
                </p>
              </div>
              <div className="w-full bg-white border border-teal-100 rounded-lg px-4 py-3 text-left flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Department</span>
                  <span className="font-medium text-gray-800">{departments.find(d => d.value === form.department)?.label || "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Subject</span>
                  <span className="font-medium text-gray-800">{form.subject || "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Reply to</span>
                  <span className="font-medium text-gray-800">{form.email}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">For urgent matters call · 091 222 2261</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", department: "", subject: "", message: "" }); }}
                className="text-xs text-teal-700 underline underline-offset-2 hover:text-teal-800 transition-colors"
              >
                Send another message
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* ── Hero ── */}
        <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl px-6 py-6 mb-6">
          <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
            <i className="ti ti-message-circle text-2xl text-teal-700" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-xl font-semibold text-gray-900 mb-1.5">Contact Us</h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Reach us by phone, email, or the enquiry form below. For medical emergencies call
              <strong className="text-red-600"> 1990 </strong>
              immediately — do not use this form.
            </p>
          </div>
        </div>

        {/* ── Highlights ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { value: "24/7",  label: "Emergency line",   icon: "ti-urgent",       color: "text-red-600"   },
            { value: "< 1d",  label: "Enquiry response", icon: "ti-clock",        color: "text-teal-700"  },
            { value: "3",     label: "Languages",        icon: "ti-language",     color: "text-purple-700"},
            { value: "10+",   label: "Direct lines",     icon: "ti-phone",        color: "text-blue-700"  },
          ].map((h) => (
            <div key={h.label} className="bg-white border border-gray-200 rounded-xl px-4 py-5 flex flex-col items-center text-center">
              <i className={`ti ${h.icon} text-xl mb-1 ${h.color}`} aria-hidden="true" />
              <span className={`text-2xl font-semibold tracking-tight ${h.color}`}>{h.value}</span>
              <span className="text-xs text-gray-400 mt-0.5">{h.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">

          {/* ══════════════════════════════════════════════════
              SECTION 1 — Direct lines
          ══════════════════════════════════════════════════ */}
          <div>
            <SectionHeader
              icon="ti-phone-call"
              color={{ bg: "bg-teal-50", icon: "text-teal-700" }}
              title="Direct Lines"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {directLines.map((d) => (
                <div
                  key={d.label}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className={`w-9 h-9 rounded-lg ${d.color.bg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`ti ${d.icon} text-base ${d.color.icon}`} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${d.color.badge}`}>
                      {d.label}
                    </span>
                    {d.isEmail ? (
                      <a
                        href={`mailto:${d.number}`}
                        className="block text-sm font-semibold text-teal-700 mt-1 truncate hover:text-teal-800 hover:underline transition-colors"
                      >
                        {d.number}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900 mt-1">{d.number}</p>
                    )}
                    <p className="text-[11px] text-gray-400 mt-0.5">{d.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              SECTION 2 — Find us / Locations
          ══════════════════════════════════════════════════ */}
          <div>
            <SectionHeader
              icon="ti-map-pin"
              color={{ bg: "bg-blue-50", icon: "text-blue-700" }}
              title="Find Us"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {locations.map((loc) => (
                <div
                  key={loc.label}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className={`w-8 h-8 rounded-lg ${loc.color.bg} flex items-center justify-center`}>
                    <i className={`ti ${loc.icon} text-sm ${loc.color.icon}`} aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{loc.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">{loc.address}</p>
                  <p className="text-[11px] text-gray-400 border-t border-gray-100 pt-2 mt-auto">{loc.note}</p>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <iframe
                title="National Hospital Galle location"
                src="https://maps.google.com/maps?q=National%20Hospital%20Galle&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-5 py-3 flex items-center justify-between bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-500">
                  <i className="ti ti-navigation text-sm" aria-hidden="true" />
                  <span className="text-xs">Wackwella Road, Galle 80000</span>
                </div>
                <a
                  href="https://maps.google.com/?q=National+Hospital+Galle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-700 font-semibold hover:text-teal-800 transition-colors flex items-center gap-1"
                >
                  Open in Maps <i className="ti ti-external-link text-xs" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              SECTION 3 — Enquiry form
          ══════════════════════════════════════════════════ */}
          <div>
            <SectionHeader
              icon="ti-mail"
              color={{ bg: "bg-purple-50", icon: "text-purple-700" }}
              title="Send an Enquiry"
            />

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full name" required>
                  <input
                    type="text" value={form.name} onChange={set("name")}
                    placeholder="e.g. Kasun Perera" required className={inputBase}
                  />
                </Field>
                <Field label="Email address" required>
                  <input
                    type="email" value={form.email} onChange={set("email")}
                    placeholder="you@example.com" required className={inputBase}
                  />
                </Field>
                <Field label="Phone number" hint="Optional — for a faster reply.">
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-500 select-none flex-shrink-0">+94</span>
                    <input
                      type="tel" value={form.phone} onChange={set("phone")}
                      placeholder="77 123 4567" className={inputBase}
                    />
                  </div>
                </Field>
                <Field label="Department" required>
                  <select value={form.department} onChange={set("department")} required className={inputBase}>
                    {departments.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Subject" required>
                <input
                  type="text" value={form.subject} onChange={set("subject")}
                  placeholder="Brief description of your enquiry" required className={inputBase}
                />
              </Field>

              <Field label="Message" required hint="Please include your patient reference number if this is about an existing case.">
                <textarea
                  value={form.message} onChange={set("message")}
                  rows={4} required
                  placeholder="Describe your enquiry in detail…"
                  className={`${inputBase} resize-none`}
                />
              </Field>

              {/* Emergency notice */}
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                <i className="ti ti-alert-triangle text-sm text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p className="text-xs text-red-700 leading-relaxed">
                  This form is for <strong>non-urgent enquiries only</strong>. If you or someone else needs immediate medical attention, call <strong>1990</strong> or go to the Emergency Unit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                <p className="text-[11px] text-gray-400">
                  <i className="ti ti-lock text-xs mr-1" aria-hidden="true" />
                  Your details are not shared with third parties.
                </p>
                
                {/* Styled submit button */}
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-teal-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-md hover:shadow-black/10 active:translate-y-0 flex-shrink-0"
                >
                  <i className="ti ti-send text-base" aria-hidden="true" />
                  Send message
                </button>
              </div>
            </form>
          </div>

          {/* ══════════════════════════════════════════════════
              SECTION 4 — FAQ
          ══════════════════════════════════════════════════ */}
          <div>
            <SectionHeader
              icon="ti-help-circle"
              color={{ bg: "bg-amber-50", icon: "text-amber-600" }}
              title="Frequently Asked Questions"
            />
            <div className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left gap-3 focus:outline-none"
                  >
                    <p className="text-sm font-medium text-gray-900">{faq.q}</p>
                    <i
                      className={`ti ti-chevron-down text-base text-gray-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50/50">
                      <p className="text-xs text-gray-500 leading-relaxed pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Footer strip ── */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900 mb-0.5">Still need help?</p>
            <p className="text-xs text-gray-500">Visit the Patient Services desk at Level 1 — open Mon – Sat, 07:30 – 17:00.</p>
          </div>
          <div className="flex items-center gap-2 text-red-600 flex-shrink-0">
            <i className="ti ti-phone text-base" aria-hidden="true" />
            <span className="text-sm font-semibold">1990 · Emergency</span>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}