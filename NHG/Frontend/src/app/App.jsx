import {
  ArrowLeft,
  CalendarPlus,
  Home,
  LayoutDashboard,
  MapPin,
  SearchX,
} from "lucide-react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import "../App.css";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";

import HomePage from "../features/public/pages/HomePage";
import VisionPage from "../features/public/pages/About/Vision";
import OverviewPage from "../features/public/pages/About/Overview";
import HistoryPage from "../features/public/pages/About/History";
import LeadershipPage from "../features/public/pages/About/Leadership";
import ServicesPage from "../features/public/pages/ServicesPage";
import DoctorsPage from "../features/doctors/pages/DoctorsPage";
import DonatePage from "../features/public/pages/DonatePage";
import BookAppointmentPage from "../features/appointments/pages/BookAppointmentPage";
import ContactPage from "../features/public/pages/ContactPage";
import PublicationsPage from "../features/public/pages/PublicationsPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPassword";

import DashboardHome from "../features/dashboard/pages/DashboardHome";
import DoctorPage from "../features/doctors/pages/DoctorPage";
import ClinicPage from "../features/clinics/pages/ClinicPage";
import PatientPage from "../features/patients/pages/PatientPage";
import PatientProfilePage from "../features/patients/pages/PatientProfilePage";
import LabPage from "../features/labs/pages/LabPage";
import StaffAccountsPage from "../features/staff/pages/StaffAccountsPage";
import AppointmentRequestsPage from "../features/dashboard/pages/AppointmentRequestsPage";
import DoctorSessionPatientsPage from "../features/dashboard/pages/DoctorSessionPatientsPage";
import { getAuthData, ROLE } from "../shared/utils/auth";

import CardiologyICU from "../features/clinical specialities/cardiologyicu";
import Surgery from "../features/clinical specialities/surgery";
import Laboratorypathology from "../features/clinical specialities/laboratorypathology";
import Maternitygynaecology from "../features/clinical specialities/Maternitygynaecology";
import Pediatricsneonatology from "../features/clinical specialities/Pediatricsneonatology";
import Radiologyimaging from "../features/clinical specialities/Radiologyimaging";

const PUBLIC_ROUTES = [
  { path: "/", element: <HomePage /> },
  { path: "/about/vision-mission", element: <VisionPage /> },
  { path: "/about/overview", element: <OverviewPage /> },
  { path: "/about/history", element: <HistoryPage /> },
  { path: "/about/leadership", element: <LeadershipPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/doctors", element: <DoctorsPage /> },
  { path: "/donate", element: <DonatePage /> },
  { path: "/book-appointment", element: <BookAppointmentPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/publications", element: <PublicationsPage /> },
  { path: "/contact", element: <ContactPage /> },

  { path: "/departments/cardiology-icu", element: <CardiologyICU /> },
  { path: "/departments/surgery", element: <Surgery /> },
  { path: "/departments/laboratorypathology", element: <Laboratorypathology /> },
  { path: "/departments/maternitygynaecology", element: <Maternitygynaecology /> },
  { path: "/departments/pediatricsneonatology", element: <Pediatricsneonatology /> },
  { path: "/departments/radiologyimaging", element: <Radiologyimaging /> },
];

// NOTE: Double-check every ROLE.* below actually exists in ../shared/utils/auth.
// If a key is missing there, route authorization will redirect instead of
// showing the protected dashboard page.
const DASHBOARD_ROUTES = [
  {
    path: "doctors",
    element: <DoctorPage />,
    roles: [ROLE.ADMIN],
  },
  {
    path: "clinics",
    element: <ClinicPage />,
    // NOTE: ADMIN is not included here. Confirm this is intentional -
    // admins usually need access to every dashboard page.
    roles: [ROLE.CONSULTANT, ROLE.DOCTOR, ROLE.PATIENT],
  },
  {
    path: "patients",
    element: <PatientPage />,
    roles: [ROLE.ADMIN, ROLE.DOCTOR],
  },
  {
    path: "profile",
    element: <PatientProfilePage />,
    roles: [ROLE.PATIENT],
  },
  {
    path: "staff",
    element: <StaffAccountsPage />,
    roles: [ROLE.ADMIN],
  },
  {
    path: "labs",
    element: <LabPage />,
    roles: [ROLE.ADMIN, ROLE.LAB, ROLE.PATIENT],
  },
  {
    path: "appointment-requests",
    element: <AppointmentRequestsPage />,
    // NOTE: ADMIN is not included here either. Confirm intentional.
    roles: [ROLE.CONSULTANT, ROLE.PATIENT],
  },
  {
    path: "session-patients",
    element: <DoctorSessionPatientsPage />,
    roles: [ROLE.DOCTOR],
  },
];

function NotFoundPage() {
  const authData = getAuthData();

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="relative isolate flex min-h-screen items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.16),transparent_34%),linear-gradient(135deg,#f8fafc_0%,#ecfeff_45%,#fff7ed_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-1.5 bg-gradient-to-r from-teal-700 via-emerald-500 to-amber-400" />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <section className="space-y-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-sm font-semibold text-teal-800 shadow-sm transition hover:border-teal-200 hover:bg-teal-50"
            >
              <ArrowLeft size={16} />
              Back to hospital home
            </Link>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                <SearchX size={16} />
                Page not found
              </div>

              <div>
                <p className="text-8xl font-black leading-none text-teal-950 sm:text-9xl">
                  404
                </p>
                <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
                  This hospital page seems to be off duty.
                </h1>
              </div>

              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                The link may be outdated, moved, or typed incorrectly. Use the
                quick actions below to return to the right place.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition hover:bg-teal-900"
              >
                <Home size={18} />
                Go Home
              </Link>

              <Link
                to={authData ? "/dashboard" : "/book-appointment"}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-5 py-3 text-sm font-bold text-teal-900 shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
              >
                {authData ? <LayoutDashboard size={18} /> : <CalendarPlus size={18} />}
                {authData ? "Open Dashboard" : "Book Appointment"}
              </Link>
            </div>
          </section>

          <section className="relative">
            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-2xl shadow-teal-950/10 backdrop-blur sm:p-7">
              <div className="rounded-[1.45rem] bg-teal-950 p-5 text-white shadow-xl shadow-teal-950/20 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-amber-300">
                      National Hospital Galle
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold">
                      Navigation desk
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                    <MapPin size={24} />
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  {[
                    ["Home", "Return to the public hospital portal", "/"],
                    ["Services", "Explore clinics, departments, and care", "/services"],
                    ["Doctors", "Find consultant and doctor information", "/doctors"],
                    ["Contact", "Get location and contact details", "/contact"],
                  ].map(([label, description, path]) => (
                    <Link
                      key={label}
                      to={path}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 transition hover:border-amber-300/50 hover:bg-white/12"
                    >
                      <span>
                        <span className="block text-sm font-bold">{label}</span>
                        <span className="mt-0.5 block text-xs text-white/65">
                          {description}
                        </span>
                      </span>
                      <ArrowLeft className="rotate-180 text-amber-300" size={17} />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 pt-4 sm:grid-cols-3">
                {["24/7 Care", "Clinics", "Appointments"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {PUBLIC_ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          {DASHBOARD_ROUTES.map(({ path, element, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute requiredRole={roles}>{element}</ProtectedRoute>
              }
            />
          ))}
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
