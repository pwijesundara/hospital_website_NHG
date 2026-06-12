import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
// ── Icons (inline SVG to avoid external deps) ──────────────────────────────
const FlaskIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a7f62" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M9 3v7l-4 9h14L15 10V3M9 3H7M15 3h2" />
  </svg>
);
const ImagingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a7f62" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);
const EmergencyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a7f62" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const ICUIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a7f62" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <line x1="12" y1="15" x2="12" y2="17" /><line x1="10" y1="16" x2="14" y2="16" />
  </svg>
);
const MaternityIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a7f62" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
const OTIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a7f62" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2.5c0 1.5-1.35 3-2 4.5h3c.83 0 .83 1.5 0 1.5H11c-.17 1-.5 2-1 2.5h4.5c.83 0 .83 1.5 0 1.5H9.5c-.5 1-.5 2 0 3.5H17c.83 0 .83 1.5 0 1.5H8c-1 0-2-1-2.5-2.5-.5-2 0-4 1-5.5C7.5 8 8 6 7.5 4.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12 19.79 19.79 0 0 1 1.65 3.29 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ── Colour tokens ──────────────────────────────────────────────────────────
const C = {
  primary: "#2a7f62",      // deep teal-green (logo / header)
  primaryLight: "#e8f5f0", // tint for tabs
  gold: "#b07d2e",         // warm amber for stats / hotline
  blue: "#1e6fa8",         // secondary accent
  text: "#1a1a1a",
  muted: "#6b7280",
  border: "#e5e7eb",
  white: "#ffffff",
  bg: "#f9fafb",
};

// ── Data ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: "1,200+", label: "Hospital beds",       color: C.primary },
  { value: "40+",    label: "Medical specialties", color: C.blue    },
  { value: "850+",   label: "Medical staff",       color: C.gold    },
  { value: "500K+",  label: "Patients per year",   color: "#c0392b" },
];

const META = [
  { label: "ESTABLISHED", value: "1987 · Karapitiya, Galle" },
  { label: "TYPE",         value: "Tertiary Teaching Hospital" },
  { label: "UNDER",        value: "Ministry of Health, Sri Lanka" },
];

const FEATURES = [
  { icon: <FlaskIcon />,    title: "Laboratory",          desc: "Automated haematology, biochemistry, microbiology with LIS and online report access." },
  { icon: <ImagingIcon />,  title: "Imaging centre",      desc: "3T MRI, CT scan, ultrasound and PACS-integrated digital radiology." },
  { icon: <EmergencyIcon />,title: "Emergency unit",      desc: "24-hour emergency and trauma care with dedicated resuscitation facilities." },
  { icon: <ICUIcon />,      title: "Intensive care",      desc: "Multi-specialty ICU with advanced monitoring and ventilator support." },
  { icon: <MaternityIcon />,title: "Maternity & NICU",    desc: "Labour suites, antenatal clinics and neonatal intensive care for high-risk births." },
  { icon: <OTIcon />,       title: "Operating theatres",  desc: "Modern OT complex with laparoscopic, orthopaedic and general surgical capability." },
];




   

function AboutTabs({ active, setActive }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: C.white, overflowX: "auto" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", gap: 0 }}>
        {ABOUT_TABS.map(t => (
          <button key={t} onClick={() => setActive(t)} style={{
            padding: "14px 18px", fontSize: 14, fontWeight: t === active ? 600 : 400,
            color: t === active ? C.primary : C.muted,
            borderBottom: t === active ? `2px solid ${C.primary}` : "2px solid transparent",
            background: "none", border: "none", borderRadius: 0, cursor: "pointer", whiteSpace: "nowrap",
            transition: "color .15s",
          }}>{t}</button>
        ))}
      </div>
    </div>
  );
}

function HeroCard() {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px", display: "flex", alignItems: "flex-start", gap: 18 }}>
        <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: "50%", background: C.primaryLight, border: `2px solid ${C.primary}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🏥</div>
        <div>
          <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: C.text }}>National Hospital Galle</h1>
          <p style={{ margin: 0, fontSize: 14, color: C.muted, lineHeight: 1.6, maxWidth: 520 }}>
            The largest tertiary care teaching hospital in Sri Lanka's Southern Province — serving a vast population across healthcare, education and research since 1987. Located in Karapitiya, Galle.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatsRow() {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="stats-grid">
          {STATS.map(s => (
            <div key={s.label} style={{ padding: "28px 20px", textAlign: "center", borderRight: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, letterSpacing: "-1px" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="about-grid">
      {/* Left: About text */}
      <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, padding: "28px 28px" }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, color: C.text }}>About the Hospital</h2>
        <p style={{ margin: "0 0 14px", fontSize: 14, color: "#374151", lineHeight: 1.75 }}>
          National Hospital Galle (NHG) is the premier tertiary care institution for Southern Sri Lanka, providing critical healthcare services to communities across Galle, Matara, Hambantota and beyond.
        </p>
        <p style={{ margin: "0 0 14px", fontSize: 14, color: "#374151", lineHeight: 1.75 }}>
          Operating under the Ministry of Health, NHG serves as both a major treatment centre and an affiliated teaching hospital for the Faculty of Medicine, University of Ruhuna.
        </p>
        <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.75 }}>
          Services span emergency care, surgical suites, maternity, paediatrics, intensive care, oncology, cardiology, radiology, laboratory and pharmacy — all in a multilingual environment supporting patients in English, Sinhala and Tamil.
        </p>
      </div>

      {/* Right: Meta info */}
      <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        {META.map((m, i) => (
          <div key={m.label} style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{m.value}</div>
          </div>
        ))}

        {/* Languages */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>LANGUAGES</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "English",  bg: "#dbeafe", color: "#1e40af" },
              { label: "සිංහල",   bg: "#fef3c7", color: "#92400e" },
              { label: "தமிழ்",   bg: "#ede9fe", color: "#5b21b6" },
            ].map(l => (
              <span key={l.label} style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: l.bg, color: l.color }}>{l.label}</span>
            ))}
          </div>
        </div>

        {/* Emergency hotline */}
        <div style={{ padding: "18px 24px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>EMERGENCY HOTLINE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#c0392b", fontWeight: 700, fontSize: 15 }}>
            <PhoneIcon />
            <span>1990 · Available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyFeatures() {
  return (
    <div style={{ background: C.bg, borderTop: `1px solid ${C.border}`, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: C.text, padding: "36px 0 28px" }}>Key features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, padding: "22px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {f.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



// ── Root Component ─────────────────────────────────────────────────────────
export default function AboutOverviewPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb; }
        a { color: inherit; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

     
        <Navbar />
      <HeroCard />
      <StatsRow />
      <AboutSection />
      <KeyFeatures />
      <Footer />
      
    </>
  );
}
