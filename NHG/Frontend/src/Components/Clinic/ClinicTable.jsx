import { Pencil, Stethoscope, Trash2, Users } from "lucide-react";
import {
  consultantName,
  doctorName,
  getClinicConsultantId,
  getClinicDoctorIds,
  getEntityId,
} from "./clinicUtils";

export default function ClinicTable({ clinics, consultants, doctors, canManage, onEdit, onDelete }) {
  const doctorLabel = (doctorIds = []) => {
    if (!doctorIds.length) return "No doctors assigned";

    return (
      doctorIds
        .map((id) => doctors.find((doctor) => String(getEntityId(doctor)) === String(id)))
        .filter(Boolean)
        .map(doctorName)
        .join(", ") || `${doctorIds.length} doctor(s)`
    );
  };

  const consultantLabel = (clinic) => {
    if (clinic.consultant) return consultantName(clinic.consultant);
    const consultantId = getClinicConsultantId(clinic);
    return (
      consultants.find(
        (consultant) => String(getEntityId(consultant)) === String(consultantId)
      )?.firstName
        ? consultantName(
            consultants.find(
              (consultant) => String(getEntityId(consultant)) === String(consultantId)
            )
          )
        : "No consultant assigned"
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-5 py-3 text-left font-medium">Clinic</th>
            <th className="px-5 py-3 text-left font-medium">Consultant</th>
            <th className="px-5 py-3 text-left font-medium">Doctors</th>
            {canManage && <th className="px-5 py-3 text-right font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {clinics.length === 0 ? (
            <tr>
              <td colSpan={canManage ? 4 : 3} className="px-5 py-12 text-center text-slate-400">
                No clinics found.
              </td>
            </tr>
          ) : (
            clinics.map((clinic) => (
              <tr key={getEntityId(clinic)} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Stethoscope size={15} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{clinic.clinicName}</p>
                      <p className="mt-1 max-w-xl text-xs text-slate-500">
                        {clinic.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-slate-500">
                  {consultantLabel(clinic)}
                </td>
                <td className="px-5 py-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Users size={13} />
                    {doctorLabel(getClinicDoctorIds(clinic))}
                  </div>
                </td>
                {canManage && (
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => onEdit(clinic)} className="mr-2 text-blue-500">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => onDelete("clinic", clinic)} className="text-red-500">
                      <Trash2 size={15} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
