import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function isLinkActive(link, pathname) {
  if (link.to === "/") return pathname === "/";

  return (
    (link.to !== "#" && pathname.startsWith(link.to)) ||
    link.dropdown?.some((item) => pathname.startsWith(item.to))
  );
}

function DrawerNavItem({ link, onClose }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const hasDropdown = Boolean(link.dropdown);
  const active = isLinkActive(link, location.pathname);

  if (hasDropdown) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-white/90 transition-colors ${
            active ? "bg-white/10 font-semibold text-white" : "hover:bg-white/5"
          }`}
        >
          <span>{link.label}</span>
        </button>

        {open && (
          <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
            {link.dropdown.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                className="block rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
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
      className={`block rounded-lg px-3 py-2.5 text-sm ${
        active
          ? "bg-white/10 font-semibold text-white"
          : "text-white/90 hover:bg-white/5"
      }`}
    >
      {link.label}
    </Link>
  );
}

export default function MobileDrawer({
  isOpen,
  links,
  authData,
  onClose,
  onLogin,
}) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-72 bg-teal-950 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 text-white">
          {links.map((link) => (
            <DrawerNavItem key={link.label} link={link} onClose={onClose} />
          ))}

          {!authData && (
            <button
              type="button"
              onClick={onLogin}
              className="mt-4 w-full rounded-lg border border-white/30 py-2"
            >
              Login / Register
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
