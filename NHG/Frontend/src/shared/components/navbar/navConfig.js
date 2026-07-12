export const NAV_LINKS = [
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
  { label: "Contact Us", to: "/contact" },
];

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "si", label: "SI" },
  { code: "ta", label: "TA" },
];

export const navLinkClass =
  "rounded-md px-3 py-1.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white";

export const activeNavLinkClass = "bg-white/15 text-white font-semibold";

export const navButtonClass =
  "rounded-lg border border-white/30 px-3 py-1.5 text-sm text-white transition hover:bg-white/10";

export const primaryButtonClass =
  "rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-500";
