import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";

// ── Blood donation data ─────────────────────────────────────────────────────

const bloodGroups = [
  { type: "A+",  status: "critical", stock: 12 },
  { type: "A−",  status: "low",      stock: 28 },
  { type: "B+",  status: "adequate", stock: 54 },
  { type: "B−",  status: "critical", stock: 8  },
  { type: "O+",  status: "low",      stock: 31 },
  { type: "O−",  status: "critical", stock: 5  },
  { type: "AB+", status: "adequate", stock: 47 },
  { type: "AB−", status: "low",      stock: 19 },
];

const stockMeta = {
  critical: { label: "Critical",  bar: "bg-red-500",   text: "text-red-700",  badge: "bg-red-50 text-red-700 border-red-200"  },
  low:      { label: "Low",       bar: "bg-amber-400",  text: "text-amber-700", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  adequate: { label: "Adequate",  bar: "bg-teal-500",  text: "text-teal-700", badge: "bg-teal-50 text-teal-700 border-teal-200"  },
};

// Stock bar width: critical ≤20%, low 20–50%, adequate 50–80%
const stockWidth = { critical: "w-1/5", low: "w-2/5", adequate: "w-3/5" };

// ── Funding needs ───────────────────────────────────────────────────────────

const fundingNeeds = [
  {
    id: "nicu",
    icon: "ti-baby-carriage",
    color: { bg: "bg-pink-50", icon: "text-pink-700", border: "border-pink-100", bar: "bg-pink-500", badge: "bg-pink-50 text-pink-700 border-pink-100" },
    title: "NICU Equipment Fund",
    desc: "Two additional ventilators for premature neonates. Each unit serves up to 40 critically ill newborns per year.",
    goal: 2400000,
    raised: 1560000,
    currency: "LKR",
    urgency: "High",
  },
  {
    id: "dialysis",
    icon: "ti-droplet",
    color: { bg: "bg-blue-50", icon: "text-blue-700", border: "border-blue-100", bar: "bg-blue-500", badge: "bg-blue-50 text-blue-700 border-blue-100" },
    title: "Dialysis Unit Expansion",
    desc: "Four new haemodialysis stations to reduce waiting times for chronic kidney disease patients in the Southern Province.",
    goal: 5600000,
    raised: 2100000,
    currency: "LKR",
    urgency: "High",
  },
  {
    id: "physio",
    icon: "ti-wheelchair",
    color: { bg: "bg-green-50", icon: "text-green-700", border: "border-green-100", bar: "bg-green-500", badge: "bg-green-50 text-green-700 border-green-100" },
    title: "Rehabilitation Ward Upgrade",
    desc: "Motorised therapy beds and parallel bars for the physiotherapy unit serving post-stroke and post-surgical patients.",
    goal: 1800000,
    raised: 1530000,
    currency: "LKR",
    urgency: "Medium",
  },
  {
    id: "oncology",
    icon: "ti-ribbons",
    color: { bg: "bg-purple-50", icon: "text-purple-700", border: "border-purple-100", bar: "bg-purple-500", badge: "bg-purple-50 text-purple-700 border-purple-100" },
    title: "Oncology Support Fund",
    desc: "Subsidise chemotherapy costs for patients below the poverty line who cannot access national welfare schemes.",
    goal: 3000000,
    raised: 720000,
    currency: "LKR",
    urgency: "Ongoing",
  },
];

// ── Equipment / in-kind donations ───────────────────────────────────────────

const inKind = [
  { icon: "ti-bed",              label: "Hospital beds & mattresses",       note: "Ward A & B refurbishment" },
  { icon: "ti-wheelchair",       label: "Wheelchairs & mobility aids",      note: "Rehabilitation & OPD use" },
  { icon: "ti-temperature",      label: "Medical refrigerators",            note: "Vaccine & medication storage" },
  { icon: "ti-device-laptop",    label: "Computers & tablets",              note: "Nursing stations & records" },
  { icon: "ti-book-2",           label: "Medical textbooks & journals",     note: "Library & training centre" },
  { icon: "ti-shirt",            label: "Patient clothing & linen",         note: "Inpatient wards" },
];

// ── Highlights ──────────────────────────────────────────────────────────────

const highlights = [
  { value: "500K+", label: "Patients/year",      icon: "ti-users",        color: "text-teal-700"  },
  { value: "24/7",  label: "Blood bank open",    icon: "ti-droplet-filled", color: "text-red-600" },
  { value: "3",     label: "Critical blood types", icon: "ti-alert-triangle", color: "text-amber-600" },
  { value: "100%",  label: "Funds audited",      icon: "ti-shield-check",  color: "text-blue-700"  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatLKR(n) {
  if (n >= 1_000_000) return `LKR ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `LKR ${(n / 1_000).toFixed(0)}K`;
  return `LKR ${n}`;
}

function pct(raised, goal) {
  return Math.min(100, Math.round((raised / goal) * 100));
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* ── Hero ── */}
        <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl px-6 py-6 mb-6">
          <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
            <i className="ti ti-heart-handshake text-2xl text-red-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-xl font-semibold text-gray-900 mb-1.5">
              Support Our Hospital
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Every contribution — blood, funds, or equipment — directly helps patients across the
              Southern Province. All donations are acknowledged and financial contributions are
              independently audited.
            </p>
          </div>
        </div>

        {/* ── Highlights ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="bg-white border border-gray-200 rounded-xl px-4 py-5 flex flex-col items-center text-center"
            >
              <i className={`ti ${h.icon} text-xl mb-1 ${h.color}`} aria-hidden="true" />
              <span className={`text-2xl font-semibold tracking-tight ${h.color}`}>{h.value}</span>
              <span className="text-xs text-gray-400 mt-0.5">{h.label}</span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 1 — BLOOD DONATION
        ══════════════════════════════════════════════════ */}
        <div className="mb-10">
          {/* Section header */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
              <i className="ti ti-droplet-filled text-base text-red-600" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-gray-800">Blood Donation</p>
          </div>

          {/* Blood stock grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {bloodGroups.map((bg) => {
              const meta = stockMeta[bg.status];
              return (
                <div
                  key={bg.type}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">{bg.type}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${meta.badge}`}>
                      {meta.label}
                    </span>
                  </div>
                  {/* Stock bar */}
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${meta.bar} ${stockWidth[bg.status]}`} />
                  </div>
                  <p className="text-[11px] text-gray-400">{bg.stock} units available</p>
                </div>
              );
            })}
          </div>

          {/* Blood donation info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-1.5 hover:border-gray-300 transition-colors">
              <i className="ti ti-clock text-base text-teal-700 mb-0.5" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Walk-in hours</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Blood bank open 24 hours, 7 days a week. No appointment needed — bring your
                National ID.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-1.5 hover:border-gray-300 transition-colors">
              <i className="ti ti-checklist text-base text-teal-700 mb-0.5" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Eligibility</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Age 18–60, weight ≥ 50 kg, haemoglobin ≥ 12.5 g/dL. Safe to donate every
                3 months.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-1.5 hover:border-gray-300 transition-colors">
              <i className="ti ti-users-group text-base text-teal-700 mb-0.5" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Group drives</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Organise a corporate or community blood drive. We provide the team and
                equipment — call to schedule.
              </p>
            </div>
          </div>

          {/* CTA strip */}
          <div className="mt-3 bg-red-50 border border-red-100 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-red-800 mb-0.5">Ready to donate blood?</p>
              <p className="text-xs text-red-600">Blood Bank · Ground Floor · Open 24/7</p>
            </div>
            <div className="flex items-center gap-2 text-red-700 flex-shrink-0">
              <i className="ti ti-phone text-base" aria-hidden="true" />
              <span className="text-sm font-semibold">091 222 2261 · Ext. 3</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 2 — FUNDING CAMPAIGNS
        ══════════════════════════════════════════════════ */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
              <i className="ti ti-coin text-base text-teal-700" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-gray-800">Active Funding Campaigns</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fundingNeeds.map((f) => {
              const progress = pct(f.raised, f.goal);
              return (
                <div
                  key={f.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-300 transition-colors"
                >
                  {/* Header row */}
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${f.color.bg} flex items-center justify-center flex-shrink-0`}>
                      <i className={`ti ${f.icon} text-base ${f.color.icon}`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${f.color.badge} whitespace-nowrap`}>
                          {f.urgency}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatLKR(f.raised)} raised
                      </span>
                      <span className="text-xs font-semibold text-gray-700">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${f.color.bar} transition-all`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-gray-400">Goal: {formatLKR(f.goal)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How to donate money */}
          <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl px-5 py-4">
            <p className="text-sm font-medium text-teal-800 mb-2">How to donate funds</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: "ti-building-bank", label: "Bank transfer", detail: "Peoples Bank · A/C 123-4567-890\nBranch: Galle · Code: 7263" },
                { icon: "ti-device-mobile", label: "Mobile payment", detail: "Dialog eZ Cash / Sampath iPay\nRef: NHG-DONATE" },
                { icon: "ti-user-dollar",   label: "In person", detail: "Hospital Cashier, Level 1\nMon – Sat · 08:00 – 16:00" },
              ].map((m) => (
                <div key={m.label} className="flex items-start gap-2.5">
                  <i className={`ti ${m.icon} text-base text-teal-700 mt-0.5 flex-shrink-0`} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-teal-800">{m.label}</p>
                    <p className="text-[11px] text-teal-700 leading-relaxed whitespace-pre-line">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 3 — EQUIPMENT & IN-KIND DONATIONS
        ══════════════════════════════════════════════════ */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
              <i className="ti ti-package text-base text-amber-600" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-gray-800">Equipment & In-Kind Donations</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {inKind.map((item) => (
              <div
                key={item.label}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:border-gray-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <i className={`ti ${item.icon} text-sm text-amber-600`} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-0.5">Want to donate equipment or supplies?</p>
              <p className="text-xs text-gray-500">Contact the hospital welfare officer to confirm item condition standards before delivery.</p>
            </div>
            <div className="flex items-center gap-2 text-amber-600 flex-shrink-0">
              <i className="ti ti-mail text-base" aria-hidden="true" />
              <span className="text-sm font-semibold">welfare@nhgalle.lk</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 4 — VOLUNTEER
        ══════════════════════════════════════════════════ */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <i className="ti ti-hand-stop text-base text-blue-700" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-gray-800">Volunteer</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: "ti-language",      title: "Interpreter",       desc: "Tamil, Sinhala, and English support for patients in outpatient and inpatient wards." },
              { icon: "ti-book",          title: "Patient Education",  desc: "Help run health literacy workshops for chronic disease patients and their families." },
              { icon: "ti-truck-delivery",title: "Logistics Support",  desc: "Assist with equipment transport, donation sorting and ward deliveries on weekends." },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 hover:border-gray-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <i className={`ti ${v.icon} text-sm text-blue-700`} aria-hidden="true" />
                </div>
                <p className="text-sm font-medium text-gray-900">{v.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer contact strip ── */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900 mb-0.5">Questions about donating?</p>
            <p className="text-xs text-gray-500">
              Our welfare team is available weekdays 08:00 – 17:00 to assist with all donation types.
            </p>
          </div>
          <div className="flex items-center gap-2 text-red-600 flex-shrink-0">
            <i className="ti ti-phone text-base" aria-hidden="true" />
            <span className="text-sm font-semibold">091 222 2261 · 24/7</span>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}