import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const TEAL = "#1a3c4e";
const GOLD = "#c9a227";

const LANGUAGES = [
  { code: "en", label: "EN", full: "English" },
  { code: "si", label: "සි",  full: "සිංහල" },
  { code: "ta", label: "த",  full: "தமிழ்" },
];

const NAV_LINKS = [
  { label: "Home", to: "/" },
   {
    label: "About",
    to: "#",
    dropdown: [
      { label: "History",          to: "/about/history" },
      { label: "Vision & Mission", to: "/about/vision-mission" },
      { label: "Overview",         to: "/about/overview" },
      { label: "Leadership",       to: "/about/leadership" },
    ],
  },
  { label: "Services",     to: "/services" },
  { label: "Doctors",      to: "/doctors" },
  { label: "Donate",       to: "/donate" },
  {label:'Publications', to: '/publications'},
 
  { label: "Contact Us",      to: "/contact" },
];

// ── Language switcher ────────────────────────────────────────────────────────
function LangSwitcher({ activeLang, setActiveLang, dark = false }) {
  const others = LANGUAGES.filter((l) => l.code !== activeLang);
  return (
    <div className="flex items-center gap-1">
      {others.map((l) => (
        <button
          key={l.code}
          onClick={() => setActiveLang(l.code)}
          title={l.full}
          className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors duration-150 ${
            dark
              ? "text-white/70 hover:text-white hover:bg-white/15"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

// ── Desktop dropdown ─────────────────────────────────────────────────────────
function DesktopDropdown({ items, isOpen }) {
  if (!isOpen) return null;
  return (
    <div
      className="absolute top-full left-0 mt-1 w-48 rounded shadow-lg overflow-hidden z-50"
      style={{ background: TEAL, border: "1px solid rgba(255,255,255,0.15)" }}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="block px-4 py-2 text-sm text-white hover:bg-white/20 transition"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

// ── Desktop nav item ─────────────────────────────────────────────────────────
function DesktopNavItem({ link }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const hasDropdown = Boolean(link.dropdown);

  const isActive =
    link.to === "/"
      ? location.pathname === "/"
      : (location.pathname.startsWith(link.to) && link.to !== "#") ||
        (hasDropdown && link.dropdown.some((child) => location.pathname.startsWith(child.to)));

  useEffect(() => {
    if (!hasDropdown) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [hasDropdown]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  if (hasDropdown) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className={`flex items-center gap-1 px-3 py-1 rounded text-white hover:bg-white/20 transition text-sm ${isActive ? "bg-white/20" : ""}`}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {link.label}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <DesktopDropdown items={link.dropdown} isOpen={open} />
      </div>
    );
  }

  return (
    <Link
      to={link.to}
      className={`px-3 py-1 rounded text-white hover:bg-white/20 transition text-sm ${isActive ? "bg-white/20" : ""}`}
    >
      {link.label}
    </Link>
  );
}

// ── Mobile nav item ──────────────────────────────────────────────────────────
function MobileNavItem({ link, onNavigate }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const hasDropdown = Boolean(link.dropdown);

  const isActive =
    link.to === "/"
      ? location.pathname === "/"
      : (location.pathname.startsWith(link.to) && link.to !== "#") ||
        (hasDropdown && link.dropdown.some((child) => location.pathname.startsWith(child.to)));

  if (hasDropdown) {
    return (
      <div>
        <button
          onClick={() => setOpen((p) => !p)}
          className={`w-full flex items-center justify-between px-5 py-3 text-sm text-white rounded-lg transition-colors duration-150 ${
            isActive ? "bg-white/15" : "hover:bg-white/10"
          }`}
        >
          <span className="font-medium">{link.label}</span>
          <svg
            className={`w-4 h-4 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="mt-0.5 ml-3 pl-3 border-l border-white/20">
            {link.dropdown.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onNavigate}
                className="block px-3 py-2.5 text-sm text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={link.to}
      onClick={onNavigate}
      className={`block px-5 py-3 text-sm font-medium text-white rounded-lg transition-colors duration-150 ${
        isActive ? "bg-white/15" : "hover:bg-white/10"
      }`}
    >
      {link.label}
    </Link>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const location = useLocation();

  const currentLang = LANGUAGES.find((l) => l.code === activeLang);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 shadow-md" style={{ background: TEAL }}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
              <span className="text-xs font-bold" style={{ color: TEAL }}>NH</span>
            </div>
            <div className="text-white leading-tight">
              <div className="font-bold text-sm">National Hospital Galle</div>
              <div className="text-xs opacity-75 hidden sm:block">
                Ministry of Health, Government of Sri Lanka
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <DesktopNavItem key={link.label} link={link} />
            ))}

            {/* Separator */}
            <div className="w-px h-5 bg-white/20 mx-1" />

            {/* Language switcher — desktop */}
            <div className="flex items-center gap-1 mr-1">
              <span className="text-xs font-semibold text-white px-2 py-0.5 rounded bg-white/15">
                {currentLang.label}
              </span>
              <LangSwitcher activeLang={activeLang} setActiveLang={setActiveLang} />
            </div>

            {/* Auth */}
            <div className="flex items-center gap-2 ml-1">
              <Link
                to="/signin"
                className="px-3 py-1 border border-white rounded text-white text-sm hover:bg-white/20 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 border border-white rounded text-white text-sm hover:bg-white/20 transition"
              >
                Register
              </Link>
              
              {/* Upgraded Button with Micro-interactions */}
              <Link
                to="/book-appointment"
                className="px-4 py-1.5 rounded text-white text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:brightness-110 hover:shadow-md hover:shadow-black/20 active:translate-y-0"
                style={{ background: GOLD }}
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Mobile right header actions */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/book-appointment"
              className="hidden sm:block px-3 py-1.5 rounded text-white text-xs font-semibold transition-all duration-300 hover:brightness-110 active:scale-95"
              style={{ background: GOLD }}
            >
              Book
            </Link>
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="text-white p-2 rounded hover:bg-white/10 transition"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Right slide-in panel ── */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: TEAL }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
              <span className="text-xs font-bold" style={{ color: TEAL }}>NH</span>
            </div>
            <span className="text-white font-semibold text-sm">Menu</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
          {NAV_LINKS.map((link) => (
            <MobileNavItem
              key={link.label}
              link={link}
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
        </div>

        {/* Language switcher — mobile panel */}
        <div
          className="px-5 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">Language</p>
          <div className="flex items-center gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setActiveLang(l.code)}
                className={`flex-1 py-1.5 rounded text-sm font-semibold transition-colors duration-150 ${
                  activeLang === l.code
                    ? "bg-white text-teal-900"
                    : "text-white/70 border border-white/25 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.full}
              </button>
            ))}
          </div>
        </div>

        {/* Auth & Primary Panel Actions */}
        <div
          className="px-4 py-5 flex flex-col gap-2.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          {/* Upgraded Mobile Panel Action Button */}
          <Link
            to="/book-appointment"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center py-2.5 rounded text-white text-sm font-bold transition-all duration-300 hover:brightness-110 hover:shadow-lg active:scale-[0.99]"
            style={{ background: GOLD }}
          >
            Book Appointment
          </Link>
          <div className="flex gap-2">
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2 border border-white/40 rounded text-white/80 text-sm hover:bg-white/10 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2 border border-white/40 rounded text-white/80 text-sm hover:bg-white/10 hover:text-white transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}