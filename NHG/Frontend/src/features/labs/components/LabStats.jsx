export default function LabStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl border border-slate-200 bg-slate-50 p-5"
        >
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold text-[#002325]">{value}</p>
        </div>
      ))}
    </div>
  );
}
