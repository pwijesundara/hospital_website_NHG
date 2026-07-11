const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={14} />;
const TEAL = "#1a3c4e";
const TEAL_MID = "#2d6a7f";
const RED_LIVE = "#dc2626";

function ClinicQueue() {
  const clinics = [
    { dept: "OPD", name: "General Medicine", serving: "47", wait: "~10 min", status: "Open", color: "#2d6a7f" },
    { dept: "Cardiology", name: "Dr. Karunanayake", serving: "23", wait: "~15 min", status: "Open", color: "#2d6a7f" },
    { dept: "Pediatrics", name: "Children's OPD", serving: "31", wait: "~30 min", status: "Open", color: "#10b981" },
    { dept: "Maternity", name: "Antenatal Clinic", serving: "58", wait: "~45 min", status: "Full", color: RED_LIVE },
  ];
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">Real-Time</p>
            <h2 className="text-2xl font-bold text-gray-900">Today's Clinic Queue</h2>
          </div>
          <a href="#" className="text-sm font-medium flex items-center gap-1" style={{ color: TEAL }}>All departments <ChevronRight /></a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clinics.map((c) => (
            <div key={c.name} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: TEAL_MID }}>{c.dept}</p>
              <p className="font-semibold text-gray-800 text-sm mb-3">{c.name}</p>
              <div className="text-5xl font-black mb-1" style={{ color: c.color }}>{c.serving}</div>
              <p className="text-xs text-gray-500 mb-2">Serving · {c.wait}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === "Full" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClinicQueue;
