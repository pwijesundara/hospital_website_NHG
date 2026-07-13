import {
  Building2,
  CalendarCheck,
  CalendarPlus,
  ClipboardList,
  LayoutDashboard,
  Microscope,
  Stethoscope,
  UserCog,
  UserRound,
  Users,
} from "lucide-react";
import { ROLE } from "../../../shared/utils/auth";

export const DASHBOARD_LINKS = [
  {
    label: "Dashboard",
    to: "/dashboard",
    end: true,
    icon: LayoutDashboard,
    roles: [
      ROLE.ADMIN,
      ROLE.CONSULTANT,
      ROLE.DOCTOR,
      ROLE.LAB,
      ROLE.NURSE,
      ROLE.PATIENT,
    ],
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
    label: "Session Patients",
    to: "/dashboard/session-patients",
    icon: UserRound,
    roles: [ROLE.DOCTOR],
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
    label: "My Profile",
    to: "/dashboard/profile",
    icon: UserRound,
    roles: [ROLE.PATIENT],
  },
  {
    label: "My Requests",
    to: "/dashboard/appointment-requests",
    icon: CalendarCheck,
    roles: [ROLE.CONSULTANT, ROLE.PATIENT],
  },
];

export const ROLE_LABELS = {
  [ROLE.ADMIN]: "Admin Management",
  [ROLE.CONSULTANT]: "Consultant Workspace",
  [ROLE.DOCTOR]: "Doctor Workspace",
  [ROLE.LAB]: "Lab Workspace",
  [ROLE.NURSE]: "Nurse Workspace",
  [ROLE.PATIENT]: "Patient Portal",
};

export const DASHBOARD_HOME_CONTENT = {
  [ROLE.ADMIN]: {
    title: "Admin Dashboard",
    description:
      "Manage hospital doctors, staff, lab accounts, and patient records from one place.",
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
        title: "Session Patients",
        description: "View accepted patients coming for your assigned sessions.",
        to: "/dashboard/session-patients",
        icon: UserRound,
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
    description:
      "Create and manage clinics, doctors assigned to clinics, and clinic sessions.",
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
    description: "Upload patient laboratory reports and diagnostic documents.",
    cards: [
      {
        title: "Add Lab Report",
        description: "Create a patient lab report using their phone number.",
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
        description: "View reports sent by the lab to your patient account.",
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
        description: "View your registered patient details.",
        to: "/dashboard/profile",
        icon: UserRound,
      },
    ],
  },
};

export const getDashboardLinkLabel = (label, role) => {
  if (role === ROLE.DOCTOR && label === "Clinics") return "My Clinics";
  if (role === ROLE.PATIENT && label === "Clinics") return "Clinics & Sessions";
  if (role === ROLE.PATIENT && label === "Labs") return "My Lab Reports";
  if (role === ROLE.LAB && label === "Labs") return "Add Lab Report";
  if (role === ROLE.CONSULTANT && label === "My Requests") {
    return "Appointment Requests";
  }

  return label;
};
