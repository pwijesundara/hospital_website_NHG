import { useState } from "react";
import ClinicQueue from "../Components/Home/ClinicQueue";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";  

// ── Icons (inline SVG helpers) ──────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const PhoneIcon = () => <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />;
const MailIcon = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />;
const MapPinIcon = () => <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a1 1 0 100-2 1 1 0 000 2" />;
const ClockIcon = () => <Icon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />;
const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={14} />;
const AlertIcon = () => <Icon d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" size={14} />;
const BotIcon = () => <Icon d="M12 2a4 4 0 014 4v2a4 4 0 01-4 4 4 4 0 01-4-4V6a4 4 0 014-4z M8 22v-2a4 4 0 014-4 4 4 0 014 4v2 M2 22h20" size={14} />;
const CalendarIcon = () => <Icon d="M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18" size={14} />;
const SearchIcon = () => <Icon d="M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.35-4.35" size={14} />;
const UserIcon = () => <Icon d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z" size={14} />;

const TEAL = "#1a3c4e";
const TEAL_DARK = "#122d3a";
const GOLD = "#c9a227";
const TEAL_MID = "#2d6a7f";
const RED_LIVE = "#dc2626";

// ── Color palette (dark teal + gold + white) ─────────────────────────────────


// ── Sub-components ────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="text-white text-xs py-1 px-4 flex flex-wrap justify-between items-center" style={{ background: TEAL_DARK }}>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1"><PhoneIcon /><span>OPD: Mon–Fri 8AM–4AM (Emergency: 24hr)</span></span>
        <span className="hidden md:inline">Kangaroo, Galle</span>
      </div>
      <div className="flex items-center gap-3">
        <span>සිංහල</span>
        <span>தமிழ்</span>
        <span>Downloads</span>
      </div>
    </div>
  );
}

// function Navbar() {
//   const links = ["Home", "About", "Services", "Doctors", "Patient Info", "Patients", "Donate", "Contact"];
//   return (
//     <nav className="sticky top-0 z-50 shadow-md" style={{ background: TEAL }}>
//       <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
//             <span className="text-xs font-bold" style={{ color: TEAL }}>NH</span>
//           </div>
//           <div className="text-white leading-tight">
//             <div className="font-bold text-sm">National Hospital Galle</div>
//             <div className="text-xs opacity-75">Ministry of Health, Government of Sri Lanka</div>
//           </div>
//         </div>
//         <div className="hidden lg:flex items-center gap-1 text-sm">
//           {links.map((l, i) => (
//             <a key={l} href="#" className={`px-3 py-1 rounded text-white hover:bg-white/20 transition ${i === 0 ? "bg-white/20" : ""}`}>{l}</a>
//           ))}
//           <a href="#" className="ml-2 px-3 py-1 border border-white rounded text-white text-sm hover:bg-white/20 transition">Login</a>
//           <a href="#" className="px-3 py-1 border border-white rounded text-white text-sm hover:bg-white/20 transition">Register</a>
//           <a href="#" className="ml-2 px-4 py-1.5 rounded text-white text-sm font-semibold transition" style={{ background: GOLD }}>Book Appointment</a>
//         </div>
//       </div>
//     </nav>
//   );
// }

function HealthAlert() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-sm text-amber-800">
      <AlertIcon />
      <strong>Health Alert:</strong>&nbsp;Elevated dengue activity in Galle District. Eliminate stagnant water. Seek OPD care for symptoms of fever, rash or joint pain.&nbsp;
      <a href="#" className="underline font-medium">Read advisory →</a>
    </div>
  );
}

function HeroSection() {
  const liveQueues = [
    { label: "OPD – General", count: 47, color: "#2d6a7f" },
    { label: "Cardiology Clinic", count: 23, color: "#2d6a7f" },
    { label: "Pediatrics OPD", count: 31, color: "#2d6a7f" },
    { label: "Maternity Clinic", count: 58, color: RED_LIVE },
    { label: "Emergency / Ambulance", count: null, color: "#374151" },
  ];
  return (
    <section className="py-12 px-4" style={{ background: `linear-gradient(135deg, ${TEAL} 55%, ${TEAL_MID} 100%)` }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
        {/* Left */}
        <div className="flex-1 text-white">
          <div className="inline-block text-xs border border-yellow-400 text-yellow-300 px-2 py-0.5 rounded mb-4">
            Tertiary Teaching Hospital · Est. 1949 · ISO Accredited
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Compassionate Care<br />
            for <span style={{ color: GOLD }}>Every Life</span> in<br />
            Southern Sri Lanka
          </h1>
          <p className="text-white/80 text-sm max-w-md mb-8 leading-relaxed">
            National Hospital Galle is the premiere tertiary-care institution serving the Southern Province – with over 1,200 beds, 40+ specialties, multilingual services, and online appointment booking available around the clock.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 rounded font-semibold text-white transition hover:opacity-90" style={{ background: GOLD }}>Book Appointment</button>
            <button className="px-5 py-2.5 rounded font-semibold border border-white text-white hover:bg-white/10 transition">Find a Doctor</button>
            <button className="px-5 py-2.5 rounded font-semibold border border-white text-white hover:bg-white/10 transition flex items-center gap-2"><BotIcon />AI Assistant</button>
          </div>
        </div>
        {/* Right – Live Queue Card */}
        <div className="w-full lg:w-72 bg-white/10 backdrop-blur rounded-2xl p-5 text-white border border-white/20 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            <span className="text-xs uppercase tracking-widest text-green-300">Live Queue Status</span>
          </div>
          {liveQueues.map((q) => (
            <div key={q.label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
              <span className="text-sm text-white/80">{q.label}</span>
              {q.count !== null ? (
                <span className="text-xl font-bold" style={{ color: q.count >= 50 ? "#f87171" : "#86efac" }}>{q.count}</span>
              ) : (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Open 24h</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickNav() {
  const items = [
    { icon: "📅", label: "Book Appointment", sub: "Online booking" },
    { icon: "👨‍⚕️", label: "Find a Doctor", sub: "Directory & profiles" },
    { icon: "🏥", label: "Today's Clinics", sub: "Real-time schedule" },
    { icon: "🚑", label: "Emergency Help", sub: "24/7 assistance" },
    { icon: "🤖", label: "AI Chat Assistant", sub: "Multilingual support" },
  ];
  return (
    <div className="border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto divide-x divide-gray-200">
        {items.map((item) => (
          <button key={item.label} className="flex-1 min-w-max flex flex-col items-center py-3 px-5 hover:bg-gray-50 transition group">
            <span className="text-xl mb-0.5">{item.icon}</span>
            <span className="text-xs font-semibold text-gray-800 group-hover:text-teal-700">{item.label}</span>
            <span className="text-xs text-gray-400">{item.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}



function ClinicalSpecialties() {
  const specialties = [
    { icon: "❤️", name: "Cardiology & ICU", desc: "Cardiac cath, angiography, ECG, echocardiography, coronary care and advanced cardiac procedures." },
    { icon: "🤱", name: "Maternity & Gynaecology", desc: "Antenatal care, safe delivery, postnatal services, NICU and comprehensive gynaecological procedures." },
    { icon: "🔬", name: "Surgery", desc: "General, orthopedic, laparoscopic, neuro and plastic surgeons with modern operation theatres." },
    { icon: "👶", name: "Pediatrics & Neonatology", desc: "Children's ward, neonatal ICU, developmental clinics and child welfare services." },
    { icon: "📡", name: "Radiology & Imaging", desc: "X-ray, CT scan, MRI, ultrasound and PACS-integrated digital imaging with 3T MRI." },
    { icon: "🧪", name: "Laboratory & Pathology", desc: "Haematology, biochemistry, microbiology, histopathology with LIMS integration." },
  ];
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: TEAL_MID }}>Departments & Services</p>
            <h2 className="text-2xl font-bold text-gray-900">Clinical Specialties</h2>
          </div>
          <a href="#" className="text-sm font-medium flex items-center gap-1" style={{ color: TEAL }}>View all 40+ departments <ChevronRight /></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((s) => (
            <div key={s.name} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition group">
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition">{s.name}</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{s.desc}</p>
              <a href="#" className="text-xs font-semibold flex items-center gap-1" style={{ color: TEAL_MID }}>View department <ChevronRight /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const [dept, setDept] = useState("");
  const [doc, setDoc] = useState("");
  const [date, setDate] = useState("");
  const [nic, setNic] = useState("");

  const steps = [
    "Select department and consultant",
    "Choose preferred date and time slot",
    "Enter your NIC or phone number",
    "Receive SMS/email confirmation instantly",
  ];

  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Left */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: TEAL_MID }}>Online Appointment</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your Visit in Minutes</h2>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-sm">
            Use our booking system to select your consultant, pick a time slot, and receive an SMS confirmation – from anywhere, in your language.
          </p>
          <ol className="space-y-3 mb-8">
            {steps.map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold flex-shrink-0" style={{ background: TEAL }}>{i + 1}</span>
                <span className="text-sm text-gray-700">{s}</span>
              </li>
            ))}
          </ol>
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: TEAL_MID }}>Patient Registration</p>
            <p className="text-sm text-gray-500 mb-4">Register for My-NHGT to manage your appointments, view medical history, and receive test results and prescriptions.</p>
            <button className="text-sm font-semibold px-4 py-2 rounded border transition" style={{ borderColor: TEAL, color: TEAL }}>Register as a Patient</button>
          </div>
        </div>

        {/* Right – Quick Appointment Form */}
        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-lg border border-gray-200 p-7">
          <h3 className="font-bold text-gray-900 mb-5 text-lg">Quick Appointment</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Department</label>
              <select value={dept} onChange={(e) => setDept(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select Department</option>
                <option>OPD – General Medicine</option>
                <option>Cardiology</option>
                <option>Pediatrics</option>
                <option>Maternity</option>
                <option>Surgery</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Consultant / Doctor</label>
              <select value={doc} onChange={(e) => setDoc(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select Doctor</option>
                <option>Dr. Karunanayake</option>
                <option>Dr. Pathinge</option>
                <option>Dr. Wickramasinghe</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Preferred Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">NIC / Phone Number</label>
              <input type="text" placeholder="Enter NIC or mobile number" value={nic} onChange={(e) => setNic(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <button className="w-full py-3 rounded-lg text-white font-semibold text-sm transition hover:opacity-90" style={{ background: TEAL }}>Check Available Slots</button>
            <p className="text-xs text-gray-400 text-center">You will receive an SMS confirmation after booking.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecialistConsultants() {
  const doctors = [
    { initials: "SK", name: "Dr. S. Karunanayake", dept: "Cardiology", quals: "MD, MRCP, DRL, FRCS", slots: "Mon–Fri, 8:00 AM", color: "#2d6a7f" },
    { initials: "RP", name: "Dr. R. Pathinge", dept: "Pediatrics", quals: "MBChB, DRCPCH, FRCPCH", slots: "Mon–Fri, 10:00 AM", color: "#9333ea" },
    { initials: "NW", name: "Dr. H. Wickramasinghe", dept: "Neurology", quals: "MD, DM Neurology", slots: "Mon–Fri, 10:00 AM", color: "#065f46" },
  ];
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: TEAL_MID }}>Our Team</p>
            <h2 className="text-2xl font-bold text-gray-900">Specialist Consultants</h2>
          </div>
          <a href="#" className="text-sm font-medium flex items-center gap-1" style={{ color: TEAL }}>All doctors <ChevronRight /></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((d) => (
            <div key={d.name} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: d.color }}>{d.initials}</div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{d.name}</p>
                  <p className="text-xs text-gray-500">{d.dept}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-1">{d.quals}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-4"><ClockIcon />{d.slots}</p>
              <button className="text-xs font-semibold px-4 py-1.5 rounded border transition" style={{ borderColor: TEAL, color: TEAL }}>Book</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIAssistant() {
  const [input, setInput] = useState("");
  const suggested = ["How to book an appointment?", "Where is the pharmacy?", "Cardiology clinic schedule", "Visiting hours"];

  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        {/* Left */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: TEAL_MID }}>AI Chat Assistant</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Answers Instantly —<br />In Your Language</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-md">Our multilingual AI chat assistant helps you find departments, understand appointment procedures, locate the pharmacy and lab report areas, and answer common questions – in English, Sinhala or Tamil.</p>
          <div className="flex flex-wrap gap-2">
            {suggested.map((s) => (
              <button key={s} className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:border-teal-500 hover:text-teal-700 transition">{s}</button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">*Chat assistant answers general questions only — no medical diagnosis or treatment advice.</p>
        </div>

        {/* Right – Chat Widget */}
        <div className="w-full lg:w-96 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <div className="px-4 py-3 flex items-center justify-between text-white text-sm font-semibold" style={{ background: TEAL }}>
            <span>NHG Assistant</span>
            <span className="flex items-center gap-1 text-xs bg-green-500 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />Online · 3 Languages</span>
          </div>
          <div className="p-4 space-y-3 bg-white min-h-48">
            <div className="text-xs text-gray-500 text-center">Welcome to National Hospital Galle! I can help you with departments, appointments, and services. How can I assist you?</div>
            <div className="flex justify-end">
              <div className="bg-teal-600 text-white text-xs px-3 py-2 rounded-xl rounded-br-none max-w-xs">Where is the laboratory report collection area?</div>
            </div>
            <div className="bg-gray-100 text-gray-700 text-xs px-3 py-2 rounded-xl rounded-bl-none max-w-xs">
              The laboratory report collection counter is located on the ground floor, Block B, near the main OPD entrance. Open Mon–Sat 7:30 AM – 5:00 PM. You can also collect via the patient portal if your lab staff has uploaded your reports.
            </div>
          </div>
          <div className="border-t border-gray-200 p-3 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="px-3 py-2 rounded-lg text-white text-xs font-semibold transition hover:opacity-90" style={{ background: TEAL }}>Send</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { num: "1,200+", label: "Hospital Beds" },
    { num: "40+", label: "Medical Specialties" },
    { num: "850+", label: "Medical Staff" },
    { num: "500K+", label: "Patients / Year" },
    { num: "3", label: "Languages Supported" },
  ];
  return (
    <div className="py-10 px-4 text-white" style={{ background: TEAL }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-black" style={{ color: GOLD }}>{s.num}</div>
            <div className="text-xs text-white/70 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsSection() {
  const news = [
    { tag: "Health Alert", tagColor: "bg-red-100 text-red-700", title: "Dengue Campaign Launched in Southern Province", desc: "Health teams conducting community outreach to prevent dengue spread this season.", date: "May 3, 2026" },
    { tag: "Facility Improve", tagColor: "bg-blue-100 text-blue-700", title: "New 3T MRI Unit Inaugurated at Radiology Department", desc: "State-of-the-art 3T MRI unit offering specialised, improved diagnostic imaging capacity.", date: "April 28, 2026" },
    { tag: "Online", tagColor: "bg-green-100 text-green-700", title: "Online Appointment System Now Live for All OPD Departments", desc: "Patients can now book, reschedule or cancel appointments from the hospital website.", date: "April 22, 2026" },
  ];
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-gray-400">Latest</p>
            <h2 className="text-2xl font-bold text-gray-900">News & Announcements</h2>
          </div>
          <a href="#" className="text-sm font-medium flex items-center gap-1" style={{ color: TEAL }}>All news <ChevronRight /></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((n) => (
            <div key={n.title} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
              <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-300 text-4xl">📰</div>
              <div className="p-5">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${n.tagColor}`}>{n.tag}</span>
                <h3 className="font-bold text-gray-800 text-sm mt-2 mb-1">{n.title}</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{n.desc}</p>
                <p className="text-xs text-gray-400">{n.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section className="py-10 px-4 bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">Support National Hospital Galle</h3>
          <p className="text-sm text-gray-500 max-w-lg">Your donations help us purchase critical medical equipment, support patient welfare programs, and improve healthcare delivery for patients across Southern Sri Lanka.</p>
        </div>
        <button className="flex-shrink-0 px-6 py-3 rounded-lg text-white font-semibold transition hover:opacity-90" style={{ background: GOLD }}>Donate Now</button>
      </div>
    </section>
  );
}

function ContactSection() {
  const items = [
    { icon: <MapPinIcon />, label: "Address", value: "Karapitiya, Galle 80000\nSouthern Province, Sri Lanka" },
    { icon: <PhoneIcon />, label: "Telephone & Emergency", value: "Mon–Fri: 091-222-2241 | Emergency: 1990\nWhatsApp: 071-800-8000" },
    { icon: <MailIcon />, label: "Email", value: "nhg@health.gov.lk\ndirector@nhgalle.health.gov.lk" },
    { icon: <ClockIcon />, label: "OPD Hours", value: "Monday – Friday: 8:00 AM – 4:00 PM\nEmergency: Open 24 hours, 7 days" },
  ];
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-gray-400">Contact Us</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Find Us & Get in Touch</h2>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: TEAL + "1a", color: TEAL }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-0.5">{item.label}</p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Map placeholder */}
        <div className="flex-1 min-h-64 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MapPinIcon />
            <p className="text-sm mt-2">Karapitiya, Galle 80000</p>
            <a href="#" className="text-xs underline mt-1 inline-block" style={{ color: TEAL }}>Get directions →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// function Footer() {
//   const cols = [
//     {
//       title: "Hospital", links: ["Home", "About Us", "History", "Accreditation", "Annual Reports"],
//     },
//     {
//       title: "Services", links: ["OPD Services", "Inpatient Care", "Emergency Services", "Laboratory", "Radiology"],
//     },
//     {
//       title: "Patients", links: ["Book Appointment", "Find a Doctor", "Patient Rights", "Patient Portal", "Feedback"],
//     },
//   ];
//   return (
//     <footer className="text-white py-12 px-4" style={{ background: TEAL_DARK }}>
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
//           {/* Brand */}
//           <div>
//             <div className="font-bold text-lg mb-2">National Hospital Galle</div>
//             <p className="text-xs text-white/60 leading-relaxed mb-4">Southern Sri Lanka's premiere tertiary care institution, serving the community with compassion since 1949.</p>
//             <div className="text-xs text-white/40">© 2026 National Hospital Galle · Ministry of Health, Sri Lanka</div>
//           </div>
//           {cols.map((col) => (
//             <div key={col.title}>
//               <p className="font-semibold text-sm mb-4" style={{ color: GOLD }}>{col.title}</p>
//               <ul className="space-y-2">
//                 {col.links.map((link) => (
//                   <li key={link}><a href="#" className="text-xs text-white/60 hover:text-white transition">{link}</a></li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
//           <span>National Hospital Galle · ISO Accredited · Tertiary Teaching Hospital</span>
//           <span>Privacy Policy · Terms of Use · Sitemap</span>
//         </div>
//       </div>
//     </footer>
//   );
// }

// ── Main Export ───────────────────────────────────────────────────────────────
export default function NationalHospitalGalle() {
  return (
    <div className="font-sans text-gray-900 min-h-screen">
      <TopBar />
      <Navbar />
      <HealthAlert />
      <HeroSection />
      <QuickNav />
      <ClinicQueue />
      <ClinicalSpecialties />
      <BookingSection />
      <SpecialistConsultants />
      <AIAssistant />
      <StatsBar />
      <NewsSection />
      <DonateSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
