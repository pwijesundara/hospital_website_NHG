import { CalendarDays, Clock, MapPin, Pencil, Trash2 } from "lucide-react";
import { getEntityId, getSessionClinicId, normalizeTime } from "./clinicUtils";

export default function ClinicSessionTable({ sessions, clinicById, canManage, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-5 py-3 text-left font-medium">Clinic</th>
            <th className="px-5 py-3 text-left font-medium">Schedule</th>
            <th className="px-5 py-3 text-left font-medium">Capacity</th>
            {canManage && <th className="px-5 py-3 text-right font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 ? (
            <tr>
              <td colSpan={canManage ? 4 : 3} className="px-5 py-12 text-center text-slate-400">
                No clinic sessions found.
              </td>
            </tr>
          ) : (
            sessions.map((session) => {
              const clinic = clinicById[String(getSessionClinicId(session))] || session.clinic;
              return (
                <tr key={getEntityId(session)} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">{clinic?.clinicName || "Unknown clinic"}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} /> {session.location || "No location"}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={13} /> {session.clinicDate || "No date"}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Clock size={13} /> {normalizeTime(session.startTime) || "--:--"} -{" "}
                      {normalizeTime(session.endTime) || "--:--"}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{session.maximumPatients ?? "-"}</td>
                  {canManage && (
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => onEdit(session)} className="mr-2 text-blue-500">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => onDelete("session", session)} className="text-red-500">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
