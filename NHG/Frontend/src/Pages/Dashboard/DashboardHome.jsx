import { CalendarCheck, CalendarPlus, ClipboardList, Microscope, Stethoscope, UserCog, UserRound, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getAuthData, ROLE } from "../../Utils/auth";

const CONTENT = {
  [ROLE.ADMIN]: {
    title: "Admin Dashboard",
    description: "Manage hospital doctors, staff, lab accounts, and patient records from one place.",
    cards: [
      {
        title: "Doctors",
        description: "Add, update, and remove doctor profiles.",
        to: "/dashboard/doctors",
        icon: Stethoscope,
      },
      {
        title: "Patients",
        description: "View and manage registered patient records.",
        to: "/dashboard/patients",
        icon: Users,
      },
      {
        title: "Staff Accounts",
        description: "Register consultant and nurse staff accounts.",
        to: "/dashboard/staff",
        icon: UserCog,
      },
      {
        title: "Labs",
        description: "Manage laboratory requests and diagnostic workflows.",
        to: "/dashboard/labs",
        icon: Microscope,
      },
    ],
  },
  [ROLE.DOCTOR]: {
    title: "Doctor Dashboard",
    description: "Review clinic schedules and patient records for daily care.",
    cards: [
      {
        title: "My Clinics",
        description: "Check clinics assigned to you and their sessions.",
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
  [ROLE.CONSULTANT]: {
    title: "Consultant Dashboard",
    description: "Create and manage clinics, doctors assigned to clinics, and clinic sessions.",
    cards: [
      {
        title: "Clinic Management",
        description: "Create clinics, assign doctors, and manage clinic sessions.",
        to: "/dashboard/clinics",
        icon: ClipboardList,
      },
      {
        title: "Appointment Requests",
        description: "Review pending requests assigned to your clinic sessions.",
        to: "/dashboard/appointment-requests",
        icon: CalendarCheck,
      },
    ],
  },
  [ROLE.LAB]: {
    title: "Lab Dashboard",
    description: "Manage laboratory tests and diagnostic workflows.",
    cards: [
      {
        title: "Labs",
        description: "Create, update, and manage laboratory test records.",
        to: "/dashboard/labs",
        icon: Microscope,
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
        title: "My Requests",
        description: "View submitted appointment request status.",
        to: "/dashboard/appointment-requests",
        icon: CalendarCheck,
      },
      {
        title: "My Lab Reports",
        description: "View lab reports linked to your patient account.",
        to: "/dashboard/labs",
        icon: Microscope,
      },
      {
        title: "Clinics & Sessions",
        description: "Watch available clinic details and scheduled sessions.",
        to: "/dashboard/clinics",
        icon: ClipboardList,
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
