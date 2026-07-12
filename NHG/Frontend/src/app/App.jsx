
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import "../App.css";
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
import LabPage from "../features/labs/pages/LabPage";
import StaffAccountsPage from "../features/staff/pages/StaffAccountsPage";
import AppointmentRequestsPage from "../features/dashboard/pages/AppointmentRequestsPage";
import DoctorSessionPatientsPage from "../features/dashboard/pages/DoctorSessionPatientsPage";
import { getAuthData, hasRole, ROLE } from "../shared/utils/auth";

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
    roles: [ROLE.CONSULTANT, ROLE.DOCTOR, ROLE.PATIENT],
  },
  {
    path: "patients",
    element: <PatientPage />,
    roles: [ROLE.ADMIN, ROLE.DOCTOR],
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
    roles: [ROLE.CONSULTANT, ROLE.PATIENT],
  },
  {
    path: "session-patients",
    element: <DoctorSessionPatientsPage />,
    roles: [ROLE.DOCTOR],
  },
];

function ProtectedDashboard() {
  const authData = getAuthData();

  if (!authData) {
    return <Navigate to="/" replace />;
  }

  return <DashboardLayout />;
}

function RoleRoute({ allowedRoles, children }) {
  const authData = getAuthData();

  if (!authData) {
    return <Navigate to="/" replace />;
  }

  if (!hasRole(allowedRoles, authData.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {PUBLIC_ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route path="/dashboard" element={<ProtectedDashboard />}>
          <Route index element={<DashboardHome />} />
          {DASHBOARD_ROUTES.map(({ path, element, roles }) => (
            <Route
              key={path}
              path={path}
              element={<RoleRoute allowedRoles={roles}>{element}</RoleRoute>}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
