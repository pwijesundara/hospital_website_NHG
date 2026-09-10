import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import "../App.css";
import ProtectedRoute from "../components/ProtectedRoute";
import LoadingFallback from "../shared/components/LoadingFallback";
import ScrollToTop from "../shared/components/ScrollToTop";
import { ROLE } from "../shared/utils/auth";

const DashboardLayout = lazy(() => import("../features/dashboard/layout/DashboardLayout"));
const HomePage = lazy(() => import("../features/public/pages/HomePage"));
const VisionPage = lazy(() => import("../features/public/pages/About/Vision"));
const OverviewPage = lazy(() => import("../features/public/pages/About/Overview"));
const HistoryPage = lazy(() => import("../features/public/pages/About/History"));
const LeadershipPage = lazy(() => import("../features/public/pages/About/Leadership"));
const ServicesPage = lazy(() => import("../features/public/pages/ServicesPage"));
const DoctorsPage = lazy(() => import("../features/doctors/pages/DoctorsPage"));
const DonatePage = lazy(() => import("../features/public/pages/DonatePage"));
const BookAppointmentPage = lazy(() => import("../features/appointments/pages/BookAppointmentPage"));
const ContactPage = lazy(() => import("../features/public/pages/ContactPage"));
const PublicationsPage = lazy(() => import("../features/public/pages/PublicationsPage"));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPassword"));
const PrivacyPolicyPage = lazy(() => import("../features/public/pages/LegalPolicyPage"));
const TermsOfUsePage = lazy(() => import("../features/public/pages/TermsOfUse"));
const DashboardHome = lazy(() => import("../features/dashboard/pages/DashboardHome"));
const DoctorPage = lazy(() => import("../features/doctors/pages/DoctorPage"));
const ClinicPage = lazy(() => import("../features/clinics/pages/ClinicPage"));
const PatientPage = lazy(() => import("../features/patients/pages/PatientPage"));
const PatientProfilePage = lazy(() => import("../features/patients/pages/PatientProfilePage"));
const LabPage = lazy(() => import("../features/labs/pages/LabPage"));
const StaffAccountsPage = lazy(() => import("../features/staff/pages/StaffAccountsPage"));
const AppointmentRequestsPage = lazy(() => import("../features/dashboard/pages/AppointmentRequestsPage"));
const DoctorSessionPatientsPage = lazy(() => import("../features/dashboard/pages/DoctorSessionPatientsPage"));
const DoctorPatientReportsPage = lazy(() => import("../features/dashboard/pages/DoctorPatientReportsPage"));
const CardiologyICU = lazy(() => import("../features/clinical specialities/cardiologyicu"));
const Surgery = lazy(() => import("../features/clinical specialities/surgery"));
const Laboratorypathology = lazy(() => import("../features/clinical specialities/laboratorypathology"));
const Maternitygynaecology = lazy(() => import("../features/clinical specialities/Maternitygynaecology"));
const Pediatricsneonatology = lazy(() => import("../features/clinical specialities/Pediatricsneonatology"));
const Radiologyimaging = lazy(() => import("../features/clinical specialities/Radiologyimaging"));
const NotFoundPage = lazy(() => import("../features/public/pages/NotFoundPage"));

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
  { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { path: "/terms", element: <TermsOfUsePage /> },

  { path: "/departments/cardiology-icu", element: <CardiologyICU /> },
  { path: "/departments/surgery", element: <Surgery /> },
  { path: "/departments/laboratorypathology", element: <Laboratorypathology /> },
  { path: "/departments/maternitygynaecology", element: <Maternitygynaecology /> },
  { path: "/departments/pediatricsneonatology", element: <Pediatricsneonatology /> },
  { path: "/departments/radiologyimaging", element: <Radiologyimaging /> },

  { path: "*", element: <NotFoundPage /> },
];

const DASHBOARD_ROUTES = [
  {
    path: "doctors",
    element: <DoctorPage />,
    roles: [ROLE.ADMIN],
  },
  {
    path: "clinics",
    element: <ClinicPage />,

    roles: [ROLE.NURSE, ROLE.DOCTOR, ROLE.PATIENT],
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

    roles: [ROLE.NURSE, ROLE.PATIENT],
  },
  {
    path: "session-patients",
    element: <DoctorSessionPatientsPage />,
    roles: [ROLE.DOCTOR],
  },
  {
    path: "patient-reports",
    element: <DoctorPatientReportsPage />,
    roles: [ROLE.DOCTOR],
  },
];

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
