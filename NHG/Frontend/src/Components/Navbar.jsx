import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const TEAL = "#0A2E30";
const GOLD = "#F9A825";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "si", label: "සි" },
  { code: "ta", label: "த" },
];

const NAV_LINKS = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "#",
    dropdown: [
      { label: "History", to: "/about/history" },
      { label: "Vision & Mission", to: "/about/vision-mission" },
      { label: "Overview", to: "/about/overview" },
      { label: "Leadership", to: "/about/leadership" },
    ],
  },
  { label: "Services", to: "/services" },
  { label: "Doctors", to: "/doctors" },
  { label: "Donate", to: "/donate" },
  { label: "Publications", to: "/publications" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Contact Us", to: "/contact" },
];

// ── Desktop dropdown ─────────────────────────────────────────────────────────
function DesktopDropdown({ items, isOpen }) {
  if (!isOpen) return null;
  return (
    <div
      className="absolute top-full left-0 mt-2 w-48 rounded-lg overflow-hidden z-50 border border-white/10 shadow-xl"
      style={{ background: TEAL }}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
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
        (hasDropdown && link.dropdown.some((c) => location.pathname.startsWith(c.to)));

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
          aria-haspopup="true"
          aria-expanded={open}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition ${isActive ? "bg-white/15 text-white font-semibold" : ""}`}
        >
          {link.label}
          <svg
            className={`w-3.5 h-3.5 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
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
      className={`px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition ${isActive ? "bg-white/15 text-white font-semibold" : ""}`}
    >
      {link.label}
    </Link>
  );
}

// ── Mobile drawer item ───────────────────────────────────────────────────────
function DrawerNavItem({ link, onClose }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const hasDropdown = Boolean(link.dropdown);

  const isActive =
    link.to === "/"
      ? location.pathname === "/"
      : (location.pathname.startsWith(link.to) && link.to !== "#") ||
        (hasDropdown && link.dropdown.some((c) => location.pathname.startsWith(c.to)));

  if (hasDropdown) {
    return (
      <div>
        <button
          onClick={() => setOpen((p) => !p)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-white/90 transition-colors ${isActive ? "bg-white/10 text-white font-semibold" : "hover:bg-white/5"}`}
        >
          <span>{link.label}</span>
          <svg
            className={`w-4 h-4 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="ml-3 pl-3 border-l border-white/10 mt-1 flex flex-col gap-0.5">
            {link.dropdown.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-all"
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
      onClick={onClose}
      className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? "bg-white/10 text-white font-semibold" : "text-white/90 hover:bg-white/5"}`}
    >
      {link.label}
    </Link>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const location = useLocation();

  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const currentLang = LANGUAGES.find((l) => l.code === activeLang);
  const otherLangs = LANGUAGES.filter((l) => l.code !== activeLang);

  return (
    <>
      <nav
        className="sticky top-0 z-50 shadow-lg border-b border-white/5 w-full"
        style={{ background: TEAL }}
      >
        <div className="px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center gap-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
              <span className="text-[10px] font-black" style={{ color: TEAL }}>NHG</span>
            </div>
            <div className="text-white leading-tight">
              <div className="font-extrabold text-sm sm:text-base tracking-wide">
                National Hospital Galle
              </div>
              <div className="text-[10px] opacity-60 hidden md:block">
                Ministry of Health, Government of Sri Lanka
              </div>
            </div>
          </Link>

          {/* Desktop nav links — only xl+ to avoid overflow */}
          <div className="hidden xl:flex flex-1 justify-center items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <DesktopNavItem key={link.label} link={link} />
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden xl:flex items-center gap-2 ml-auto shrink-0">
            {/* Language switcher */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">
                {currentLang.label}
              </span>
              {otherLangs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setActiveLang(l.code)}
                  className="text-xs text-white/60 hover:text-white px-1.5 py-0.5 rounded hover:bg-white/10 transition"
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Register */}
            <Link
              to="/register"
              className="px-3 py-1.5 border border-white/30 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition"
            >
              Register
            </Link>

            {/* Login */}
            <Link
              to="/signin"
              className="px-3 py-1.5 border border-white/30 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition"
            >
              Login
            </Link>

            {/* Book Appointment */}
            <Link
              to="/book-appointment"
              className="px-4 py-2 rounded-lg text-white text-sm font-bold hover:brightness-110 active:scale-95 transition whitespace-nowrap"
              style={{ background: GOLD }}
            >
              Book Appointment
            </Link>
          </div>

          {/* Tablet (lg) — show Register + Login + Book + hamburger, hide full nav */}
          <div className="hidden lg:flex xl:hidden items-center gap-2 ml-auto shrink-0">
            <Link
              to="/register"
              className="px-3 py-1.5 border border-white/30 rounded-lg text-white text-xs font-medium hover:bg-white/10 transition"
            >
              Register
            </Link>
            <Link
              to="/signin"
              className="px-3 py-1.5 border border-white/30 rounded-lg text-white text-xs font-medium hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              to="/book-appointment"
              className="px-3 py-1.5 rounded-lg text-white text-xs font-bold whitespace-nowrap"
              style={{ background: GOLD }}
            >
              Book
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile — Book + hamburger only */}
          <div className="flex lg:hidden items-center gap-2 ml-auto shrink-0">
            <Link
              to="/book-appointment"
              className="px-3 py-1.5 rounded-lg text-white text-xs font-bold whitespace-nowrap"
              style={{ background: GOLD }}
            >
              Book
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      {/* Right-side drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: TEAL }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <span className="text-[8px] font-black" style={{ color: TEAL }}>NHG</span>
            </div>
            <span className="text-white text-sm font-semibold">Menu</span>
          </div>
          <button
            onClick={closeDrawer}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <DrawerNavItem key={link.label} link={link} onClose={closeDrawer} />
          ))}
        </div>

        {/* Drawer footer */}
        <div className="px-4 py-4 border-t border-white/10 flex flex-col gap-2">
          {/* Language */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">
              {currentLang.label}
            </span>
            {otherLangs.map((l) => (
              <button
                key={l.code}
                onClick={() => setActiveLang(l.code)}
                className="text-xs text-white/60 hover:text-white px-1.5 py-0.5 rounded hover:bg-white/10 transition"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Register */}
          <Link
            to="/register"
            onClick={closeDrawer}
            className="block text-center px-4 py-2 border border-white/30 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition"
          >
            Register
          </Link>

          {/* Login */}
          <Link
            to="/signin"
            onClick={closeDrawer}
            className="block text-center px-4 py-2 border border-white/30 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition"
          >
            Login
          </Link>

          {/* Book Appointment */}
          <Link
            to="/book-appointment"
            onClick={closeDrawer}
            className="block text-center px-4 py-2 rounded-lg text-white text-sm font-bold hover:brightness-110 transition"
            style={{ background: GOLD }}
          >
            Book Appointment
          </Link>
        </div>
      </aside>
    </>
  );
}