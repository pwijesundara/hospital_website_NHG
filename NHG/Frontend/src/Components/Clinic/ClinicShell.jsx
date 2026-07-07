import { Building2, CalendarDays, Plus, Search } from "lucide-react";

export default function ClinicShell({
  title,
  subtitle,
  activeTab,
  setActiveTab,
  search,
  setSearch,
  canManage,
  onAddClinic,
  onAddSession,
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Building2 size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
          </div>

          {canManage && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onAddClinic}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600"
              >
                <Plus size={15} /> Add Clinic
              </button>
              <button
                onClick={onAddSession}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                <CalendarDays size={15} /> Add Session
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="inline-flex w-fit rounded-lg border border-slate-200 bg-white p-1">
            {[
              ["clinics", "Clinics"],
              ["sessions", "Sessions"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  activeTab === value ? "bg-emerald-50 text-emerald-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={activeTab === "clinics" ? "Search clinics..." : "Search sessions..."}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

