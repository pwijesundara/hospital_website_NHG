import {
  Building2,
  CalendarCheck,
  Home,
  LayoutDashboard,
  LogOut,
  Microscope,
  Stethoscope,
  UserCog,
  Users,
} from "lucide-react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getAuthData, hasRole, ROLE } from "../Utils/auth";

const DASHBOARD_LINKS = [
  {
    label: "Dashboard",
    to: "/dashboard",
    end: true,
    icon: LayoutDashboard,
    roles: [ROLE.ADMIN, ROLE.CONSULTANT, ROLE.DOCTOR, ROLE.LAB, ROLE.NURSE, ROLE.PATIENT],
  },
  {
    label: "Doctors",
    to: "/dashboard/doctors",
    icon: Stethoscope,
    roles: [ROLE.ADMIN],
  },
  {
    label: "Clinics",
    to: "/dashboard/clinics",
    icon: Building2,
    roles: [ROLE.CONSULTANT, ROLE.DOCTOR, ROLE.PATIENT],
  },
  {
    label: "Patients",
    to: "/dashboard/patients",
    icon: Users,
    roles: [ROLE.ADMIN, ROLE.DOCTOR],
  },
  {
    label: "Staff Accounts",
    to: "/dashboard/staff",
    icon: UserCog,
    roles: [ROLE.ADMIN],
  },
  {
    label: "Labs",
    to: "/dashboard/labs",
    icon: Microscope,
    roles: [ROLE.ADMIN, ROLE.LAB, ROLE.PATIENT],
  },
  {
    label: "My Requests",
    to: "/dashboard/appointment-requests",
    icon: CalendarCheck,
    roles: [ROLE.CONSULTANT, ROLE.PATIENT],
  },
];

const ROLE_LABELS = {
  [ROLE.ADMIN]: "Admin Management",
  [ROLE.CONSULTANT]: "Consultant Workspace",
  [ROLE.DOCTOR]: "Doctor Workspace",
  [ROLE.LAB]: "Lab Workspace",
  [ROLE.NURSE]: "Nurse Workspace",
  [ROLE.PATIENT]: "Patient Portal",
};

function DashboardLayout() {
  const navigate = useNavigate();
  const authData = getAuthData();
  const role = authData?.role || ROLE.PATIENT;
  const visibleLinks = DASHBOARD_LINKS.filter((link) => hasRole(link.roles, role));

  const handleLogout = () => {
    localStorage.removeItem("authData");
    window.dispatchEvent(new Event("authDataChanged"));
    navigate("/");
  };

  const activeStyle = ({ isActive }) =>
    `p-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
      isActive
        ? "bg-[#FFB703] text-[#001D1F] font-bold shadow-md"
        : "text-gray-300 hover:bg-[#00383B] hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-[#F4F7F6]">
      <aside className="sticky top-0 h-screen w-64 bg-[#002325] text-white flex flex-col p-6 shadow-xl border-r border-[#003336]">
        <div className="mb-10 pb-4 border-b border-[#00383B] flex-shrink-0">
          <h2 className="text-xl font-extrabold tracking-wide text-white uppercase">
            NHG <span className="text-[#FFB703]">Galle</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {ROLE_LABELS[role] || "Dashboard"}
          </p>
        </div>

        <nav className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pr-1">
          {visibleLinks.map(({ label, to, end, icon: Icon }) => (
            <NavLink key={to} to={to} end={end} className={activeStyle}>
              <Icon size={18} />
              {role === ROLE.DOCTOR && label === "Clinics"
                ? "My Clinics"
                : role === ROLE.PATIENT && label === "Clinics"
                  ? "Clinics & Sessions"
                  : role === ROLE.PATIENT && label === "Labs"
                    ? "My Lab Reports"
                    : role === ROLE.CONSULTANT && label === "My Requests"
                      ? "Appointment Requests"
                    : label}
            </NavLink>
          ))}
        </nav>

        <div className="flex-shrink-0 pt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full border-2 border-[#FFB703] text-[#FFB703] hover:bg-[#FFB703] hover:text-[#001D1F] font-semibold p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home size={18} /> Go to Website
          </button>

          <button
            onClick={handleLogout}
            className="mt-3 w-full border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white font-semibold p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-[#002325]">
            {ROLE_LABELS[role] || "Hospital Dashboard"}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">
              {role} Session
            </span>
            <div className="w-10 h-10 rounded-full bg-[#002325] text-[#FFB703] flex items-center justify-center font-bold">
              {role.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm min-h-[80vh] border border-gray-100">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
