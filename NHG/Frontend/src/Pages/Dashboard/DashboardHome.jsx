import { CalendarPlus, ClipboardList, Stethoscope, UserRound, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getAuthData, ROLE } from "../../Utils/auth";

const CONTENT = {
  [ROLE.ADMIN]: {
    title: "Admin Dashboard",
    description: "Manage hospital doctors, clinics, and patient records from one place.",
    cards: [
      {
        title: "Doctors",
        description: "Add, update, and remove doctor profiles.",
        to: "/dashboard/doctors",
        icon: Stethoscope,
      },
      {
        title: "Clinics",
        description: "Maintain clinic details and working schedules.",
        to: "/dashboard/clinics",
        icon: ClipboardList,
      },
      {
        title: "Patients",
        description: "View and manage registered patient records.",
        to: "/dashboard/patients",
        icon: Users,
      },
    ],
  },
  [ROLE.DOCTOR]: {
    title: "Doctor Dashboard",
    description: "Review clinic schedules and patient records for daily care.",
    cards: [
      {
        title: "Clinics",
        description: "Check clinic information and availability.",
        to: "/dashboard/clinics",
        icon: ClipboardList,
      },
      {
        title: "Patients",
        description: "Access patient details and medical records.",
        to: "/dashboard/patients",
        icon: Users,
      },
    ],
  },
  [ROLE.PATIENT]: {
    title: "Patient Dashboard",
    description: "Welcome to your NHG patient portal.",
    cards: [
      {
        title: "Book Appointment",
        description: "Request an appointment with hospital services.",
        to: "/book-appointment",
        icon: CalendarPlus,
      },
      {
        title: "My Profile",
        description: "Your patient account is signed in and ready.",
        to: "/dashboard",
        icon: UserRound,
      },
    ],
  },
};

function DashboardHome() {
  const authData = getAuthData();
  const role = authData?.role || ROLE.PATIENT;
  const content = CONTENT[role] || CONTENT[ROLE.PATIENT];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          {role}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#002325]">
          {content.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          {content.description}
        </p>
        {authData?.id && (
          <p className="mt-4 text-xs font-medium text-slate-500">
            Logged in user ID: {authData.id}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content.cards.map(({ title, description, to, icon: Icon }) => (
          <Link
            key={title}
            to={to}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <Icon size={21} />
            </div>
            <h3 className="text-base font-semibold text-slate-800">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
