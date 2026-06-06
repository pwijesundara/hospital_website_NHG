function Navbar() {
const TEAL = "#1a3c4e";
const GOLD = "#c9a227";


  const links = ["Home", "About", "Services", "Doctors", "Patient Info", "Patients", "Donate", "Contact"];
  return (
    <nav className="sticky top-0 z-50 shadow-md" style={{ background: TEAL }}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <span className="text-xs font-bold" style={{ color: TEAL }}>NH</span>
          </div>
          <div className="text-white leading-tight">
            <div className="font-bold text-sm">National Hospital Galle</div>
            <div className="text-xs opacity-75">Ministry of Health, Government of Sri Lanka</div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-1 text-sm">
          {links.map((l, i) => (
            <a key={l} href="#" className={`px-3 py-1 rounded text-white hover:bg-white/20 transition ${i === 0 ? "bg-white/20" : ""}`}>{l}</a>
          ))}
          <a href="signin" className="ml-2 px-3 py-1 border border-white rounded text-white text-sm hover:bg-white/20 transition">Login</a>
          <a href="register" className="px-3 py-1 border border-white rounded text-white text-sm hover:bg-white/20 transition">Register</a>
          <a href="book-appointment" className="ml-2 px-4 py-1.5 rounded text-white text-sm font-semibold transition" style={{ background: GOLD }}>Book Appointment</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;