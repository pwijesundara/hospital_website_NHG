import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import { getAuthData } from "../Utils/auth";

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
  { label: "Dashboard", to: "/dashboard", requiresAuth: true },
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
        (hasDropdown &&
          link.dropdown.some((c) => location.pathname.startsWith(c.to)));

  useEffect(() => {
    if (!hasDropdown) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [hasDropdown]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (hasDropdown) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition ${
            isActive ? "bg-white/15 text-white font-semibold" : ""
          }`}
        >
          {link.label}
        </button>

        <DesktopDropdown items={link.dropdown} isOpen={open} />
      </div>
    );
  }

  return (
    <Link
      to={link.to}
      className={`px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition ${
        isActive ? "bg-white/15 text-white font-semibold" : ""
      }`}
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
        (hasDropdown &&
          link.dropdown.some((c) => location.pathname.startsWith(c.to)));

  if (hasDropdown) {
    return (
      <div>
        <button
          onClick={() => setOpen((p) => !p)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-white/90 transition-colors ${
            isActive
              ? "bg-white/10 text-white font-semibold"
              : "hover:bg-white/5"
          }`}
        >
          <span>{link.label}</span>
        </button>

        {open && (
          <div className="ml-3 pl-3 border-l border-white/10 mt-1 flex flex-col gap-0.5">
            {link.dropdown.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md"
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
      className={`block px-3 py-2.5 rounded-lg text-sm ${
        isActive
          ? "bg-white/10 text-white font-semibold"
          : "text-white/90 hover:bg-white/5"
      }`}
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
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authData, setAuthData] = useState(getAuthData);

  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const syncAuth = () => setAuthData(getAuthData());
    window.addEventListener("storage", syncAuth);
    window.addEventListener("authDataChanged", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authDataChanged", syncAuth);
    };
  }, []);

  useEffect(() => {
    setAuthData(getAuthData());
  }, [location.pathname]);

  const currentLang = LANGUAGES.find((l) => l.code === activeLang);
  const visibleNavLinks = NAV_LINKS.filter(
    (link) => !link.requiresAuth || Boolean(authData)
  );
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
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow-md">
              <span
                className="text-[10px] font-black"
                style={{ color: TEAL }}
              >
                NHG
              </span>
            </div>
            <div className="text-white leading-tight">
              <div className="font-extrabold text-sm sm:text-base">
                National Hospital Galle
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex flex-1 justify-center gap-0.5">
            {visibleNavLinks.map((link) => (
              <DesktopNavItem key={link.label} link={link} />
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden xl:flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1">
              <span className="text-xs text-white bg-white/20 px-2 py-0.5 rounded">
                {currentLang.label}
              </span>
              {otherLangs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setActiveLang(l.code)}
                  className="text-xs text-white/60 hover:text-white px-1.5"
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* MODAL LOGIN */}
            <button
              onClick={() => setLoginOpen(true)}
              className="px-3 py-1.5 border border-white/30 rounded-lg text-white text-sm"
            >
              Login / Register
            </button>

            <Link
              to="/book-appointment"
              className="px-4 py-2 rounded-lg text-white text-sm font-bold"
              style={{ background: GOLD }}
            >
              Book Appointment
            </Link>
          </div>

          {/* Tablet */}
          <div className="hidden lg:flex xl:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => setLoginOpen(true)}
              className="px-3 py-1.5 border border-white/30 rounded-lg text-white text-sm"
            >
              Login
            </button>

            <button
              onClick={() => setLoginOpen(true)}
              className="px-3 py-1.5 border border-white/30 rounded-lg text-white text-sm"
            >
              Register
            </button>

            <Link
              to="/book-appointment"
              className="px-3 py-1.5 rounded-lg text-white text-xs font-bold"
              style={{ background: GOLD }}
            >
              Book
            </Link>

            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-white"
            >
              ☰
            </button>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <Link
              to="/book-appointment"
              className="px-3 py-1.5 rounded-lg text-white text-xs font-bold"
              style={{ background: GOLD }}
            >
              Book
            </Link>

            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-white"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={closeDrawer}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-72 z-50 transition-transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: TEAL }}
      >
        <div className="p-4 text-white">
          {visibleNavLinks.map((link) => (
            <DrawerNavItem
              key={link.label}
              link={link}
              onClose={closeDrawer}
            />
          ))}

          <button
            onClick={() => {
              setAuthMode("login");
              setLoginOpen(true);
            }}
            className="mt-4 w-full border border-white/30 py-2 rounded-lg"
          >
            Login / Register
          </button>
        </div>
      </aside>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 sm:p-4"
          onClick={() => setLoginOpen(false)}
        >
          <div className="max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {authMode === "register" ? (
              <Register
                onClose={() => setLoginOpen(false)}
                onSwitchToLogin={() => setAuthMode("login")}
              />
            ) : (
              <Login
                onClose={() => setLoginOpen(false)}
                onSwitchToRegister={() => setAuthMode("register")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
