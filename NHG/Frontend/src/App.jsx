
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';

import './App.css'
// Layout
import DashboardLayout from "./Layout/DashboardLayout";

import HomePage from "./Pages/home";
import VisionPage from "./Pages/About/Vision";
import OverviewPage from "./Pages/About/Overview";
import HistoryPage from "./Pages/About/History";
import LeadershipPage from "./Pages/About/Leadership";
import ServicesPage from "./Pages/Services";
import DoctorsPage from "./Pages/Doctors";
import DonatePage from "./Pages/Donate";
import BookAppointmentPage from "./Pages/BookAppoinment";
import ContactPage from './Pages/Contact';
import PublicationsPage from './Pages/Publications';

import DashboardHome from './Pages/Dashboard/DashboardHome';
import DoctorPage from './Pages/Dashboard/DoctorPage';
import ClinicPage from './Pages/Dashboard/ClinicPage';
import PatientPage from './Pages/Dashboard/PatientPage';
import { getAuthData, hasRole, ROLE } from './Utils/auth';

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
    <>
      <Router>
        <Routes>
       
        <Route path="/" element={<HomePage />} />
        <Route path="/about/vision-mission" element={<VisionPage />} />
        <Route path="/about/overview" element={<OverviewPage />} />
        <Route path="/about/history" element={<HistoryPage />} />
        <Route path="/about/leadership" element={<LeadershipPage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        
        <Route path="/dashboard" element={<ProtectedDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route
            path="doctors"
            element={
              <RoleRoute allowedRoles={[ROLE.ADMIN]}>
                <DoctorPage />
              </RoleRoute>
            }
          />
          <Route
            path="clinics"
            element={
              <RoleRoute allowedRoles={[ROLE.ADMIN, ROLE.DOCTOR]}>
                <ClinicPage />
              </RoleRoute>
            }
          />
          <Route
            path="patients"
            element={
              <RoleRoute allowedRoles={[ROLE.ADMIN, ROLE.DOCTOR]}>
                <PatientPage />
              </RoleRoute>
            }
          />
        </Route>

      </Routes>
      </Router>
    </>
  )
}

export default App
