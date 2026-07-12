import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuthData } from "../utils/auth";
import AuthModal from "./navbar/AuthModal";
import MobileDrawer from "./navbar/MobileDrawer";
import {
  activeNavLinkClass,
  LANGUAGES,
  NAV_LINKS,
  navButtonClass,
  navLinkClass,
  primaryButtonClass,
} from "./navbar/navConfig";

function isLinkActive(link, pathname) {
  if (link.to === "/") return pathname === "/";

  return (
    (link.to !== "#" && pathname.startsWith(link.to)) ||
    link.dropdown?.some((item) => pathname.startsWith(item.to))
  );
}

function DesktopDropdown({ items, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-white/10 bg-teal-950 shadow-xl">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="block px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function DesktopNavItem({ link }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const hasDropdown = Boolean(link.dropdown);
  const active = isLinkActive(link, location.pathname);

  useEffect(() => {
    if (!hasDropdown) return undefined;

    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [hasDropdown]);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (hasDropdown) {
    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={`${navLinkClass} flex items-center gap-1 ${
            active ? activeNavLinkClass : ""
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
      className={`${navLinkClass} ${active ? activeNavLinkClass : ""}`}
    >
      {link.label}
    </Link>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authData, setAuthData] = useState(getAuthData);
  const location = useLocation();
  const navigate = useNavigate();

  const visibleNavLinks = NAV_LINKS.filter(
    (link) => !link.requiresAuth || Boolean(authData)
  );
  const currentLang = LANGUAGES.find((language) => language.code === activeLang);
  const otherLangs = LANGUAGES.filter((language) => language.code !== activeLang);
  const primaryActionLabel = authData ? "Dashboard Access" : "Book Appointment";
  const compactPrimaryActionLabel = authData ? "Dashboard" : "Book";

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handlePrimaryAction = () => {
    if (authData) {
      navigate("/dashboard");
      return;
    }

    openAuthModal("login");
  };

  useEffect(() => {
    const timer = setTimeout(() => setDrawerOpen(false), 0);
    return () => clearTimeout(timer);
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
    const timer = setTimeout(() => setAuthData(getAuthData()), 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-teal-950 shadow-lg">
        <div className="flex h-16 items-center gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md sm:h-11 sm:w-11">
              <span className="text-[10px] font-black text-teal-950">NHG</span>
            </div>
            <div className="text-white">
              <div className="text-sm font-extrabold leading-tight sm:text-base">
                National Hospital Galle
              </div>
            </div>
          </Link>

          <div className="hidden flex-1 justify-center gap-0.5 xl:flex">
            {visibleNavLinks.map((link) => (
              <DesktopNavItem key={link.label} link={link} />
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-2 xl:flex">
            <div className="flex items-center gap-1">
              <span className="rounded bg-white/20 px-2 py-0.5 text-xs text-white">
                {currentLang.label}
              </span>
              {otherLangs.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => setActiveLang(language.code)}
                  className="px-1.5 text-xs text-white/60 hover:text-white"
                >
                  {language.label}
                </button>
              ))}
            </div>

            {!authData && (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className={navButtonClass}
              >
                Login / Register
              </button>
            )}

            <button
              type="button"
              onClick={handlePrimaryAction}
              className={primaryButtonClass}
            >
              {primaryActionLabel}
            </button>
          </div>

          <div className="ml-auto hidden items-center gap-2 lg:flex xl:hidden">
            {!authData && (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className={navButtonClass}
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className={navButtonClass}
                >
                  Register
                </button>
              </>
            )}

            <button
              type="button"
              onClick={handlePrimaryAction}
              className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-amber-500"
            >
              {compactPrimaryActionLabel}
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-white"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-amber-500"
            >
              {compactPrimaryActionLabel}
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-white"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer
        isOpen={drawerOpen}
        links={visibleNavLinks}
        authData={authData}
        onClose={() => setDrawerOpen(false)}
        onLogin={() => openAuthModal("login")}
      />

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onModeChange={setAuthMode}
      />
    </>
  );
}
