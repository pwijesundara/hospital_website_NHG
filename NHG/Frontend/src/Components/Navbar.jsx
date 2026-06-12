import { useState, useRef, useEffect } from "react";

const TEAL = "#1a3c4e";
const GOLD = "#c9a227";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  {
    label: "About",
    href: "#",
    dropdown: [
      { label: "History", href: "/history" },
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Overview", href: "/about/overview" },
      { label: "Leadership", href: "/leadership" },
    ],
  },
  { label: "Services", href: "#" },
  { label: "Doctors", href: "#" },
  { label: "Patient Info", href: "#" },
  { label: "Patients", href: "#" },
  { label: "Donate", href: "#" },
  { label: "Contact", href: "#" },
];

function DropdownMenu({ items, isOpen }) {
  if (!isOpen) return null;
  return (
    <div
      className="absolute top-full left-0 mt-1 w-48 rounded shadow-lg overflow-hidden z-50"
      style={{ background: TEAL, border: `1px solid rgba(255,255,255,0.15)` }}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block px-4 py-2 text-sm text-white hover:bg-white/20 transition"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

function NavItem({ link, isActive }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const hasDropdown = Boolean(link.dropdown);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!hasDropdown) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [hasDropdown]);

  if (hasDropdown) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center gap-1 px-3 py-1 rounded text-white hover:bg-white/20 transition text-sm ${
            isActive ? "bg-white/20" : ""
          }`}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {link.label}
          {/* Chevron icon */}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <DropdownMenu items={link.dropdown} isOpen={open} />
      </div>
    );
  }

  return (
    <a
      href={link.href}
      className={`px-3 py-1 rounded text-white hover:bg-white/20 transition text-sm ${
        isActive ? "bg-white/20" : ""
      }`}
    >
      {link.label}
    </a>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 shadow-md" style={{ background: TEAL }}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Logo + Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-xs font-bold" style={{ color: TEAL }}>NH</span>
          </div>
          <div className="text-white leading-tight">
            <div className="font-bold text-sm">National Hospital Galle</div>
            <div className="text-xs opacity-75">Ministry of Health, Government of Sri Lanka</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <NavItem key={link.label} link={link} isActive={i === 0} />
          ))}

          {/* Auth & CTA */}
          <div className="flex items-center gap-2 ml-2">
            <a
              href="signin"
              className="px-3 py-1 border border-white rounded text-white text-sm hover:bg-white/20 transition"
            >
              Login
            </a>
            <a
              href="register"
              className="px-3 py-1 border border-white rounded text-white text-sm hover:bg-white/20 transition"
            >
              Register
            </a>
            <a
              href="book-appointment"
              className="px-4 py-1.5 rounded text-white text-sm font-semibold transition"
              style={{ background: GOLD }}
            >
              Book Appointment
            </a>
          </div>
        </div>

        {/* Mobile hamburger (placeholder) */}
        <button className="lg:hidden text-white p-2" aria-label="Open menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </nav>
  );
}