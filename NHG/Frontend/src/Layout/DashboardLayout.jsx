import { Outlet, NavLink, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const navigate = useNavigate();

  // Active link styling for React Router NavLink
  const activeStyle = ({ isActive }) => 
    `p-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
      isActive 
        ? "bg-[#FFB703] text-[#001D1F] font-bold shadow-md" 
        : "text-gray-300 hover:bg-[#00383B] hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-[#F4F7F6]">

      {/* Sidebar - Matching the Deep Dark Teal from your Landing Page */}
      <aside className="w-64 bg-[#002325] text-white flex flex-col p-6 shadow-xl border-r border-[#003336]">

        {/* Brand Header */}
        <div className="mb-10 pb-4 border-b border-[#00383B]">
          <h2 className="text-xl font-extrabold tracking-wide text-white uppercase">
            NHG <span className="text-[#FFB703]">Galle</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Admin Management</p>
        </div>

        {/* Navigation links with updated theme states */}
        <nav className="flex flex-col gap-2 flex-1">
          <NavLink to="/dashboard" end className={activeStyle}>
            <span>📊</span> Dashboard
          </NavLink>

          <NavLink to="/dashboard/doctors" className={activeStyle}>
            <span>👨‍⚕️</span> Doctors
          </NavLink>

          <NavLink to="/dashboard/clinics" className={activeStyle}>
            <span>🏥</span> Clinics
          </NavLink>

          <NavLink to="/dashboard/patients" className={activeStyle}>
            <span>👥</span> Patients
          </NavLink>
        </nav>

        {/* Home Button - Sleek styling styled like your "Find a Doctor" outline button variant */}
        <button
          onClick={() => navigate("/")}
          className="mt-auto border-2 border-[#FFB703] text-[#FFB703] hover:bg-[#FFB703] hover:text-[#001D1F] font-semibold p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          🏠 Go to Website
        </button>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Header Panel */}
        <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-[#002325]">Hospital Admin Panel</h1>
          
          {/* User profile placeholder */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Admin Session</span>
            <div className="w-10 h-10 rounded-full bg-[#002325] text-[#FFB703] flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Nested View Area */}
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