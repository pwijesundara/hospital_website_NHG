import { getEntityId, normalizeTime } from "../../clinics/components/clinicUtils";
import { prefLangs } from "../data/bookAppointmentData";
import { prefLangDisplay } from "../data/bookAppointmentI18n";
import { Field, inputBase, SectionHeader } from "./bookAppointmentUi";

const SLOT_MINUTES = 10;

const toMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const toClock = (total) =>
  `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

const buildSlots = (start, end) => {
  if (!start || !end) return [];
  const slots = [];
  for (let minute = toMinutes(start); minute <= toMinutes(end); minute += SLOT_MINUTES) {
    slots.push(toClock(minute));
  }
  return slots;
};

export default function ScheduleSection({ form, sessions, t, uiLang, onChange }) {
  const langLabels = prefLangDisplay[uiLang] || prefLangDisplay.en;

  const selectedSession = (sessions || []).find(
    (session) => String(getEntityId(session)) === String(form.type)
  );
  const sessionStart = normalizeTime(selectedSession?.startTime);
  const sessionEnd = normalizeTime(selectedSession?.endTime);
  const availableSlots = selectedSession
    ? buildSlots(sessionStart, sessionEnd)
    : [];
  const lockedFieldClass = selectedSession
    ? inputBase
    : `${inputBase} opacity-60 cursor-not-allowed`;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />}
        color={{ bg: "bg-amber-50", icon: "text-amber-600" }}
        title={t.schedule.title}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field
          label={t.schedule.date}
          required
          hint={
            selectedSession
              ? t.schedule.dateLockedHint
              : t.schedule.pickClinicFirst
          }
        >
          <input
            type="date"
            value={form.date}
            onChange={onChange("date")}
            min={new Date().toISOString().split("T")[0]}
            required
            readOnly={Boolean(selectedSession)}
            disabled={!selectedSession}
            className={lockedFieldClass}
          />
        </Field>
        <Field
          label={t.schedule.time}
          required
          hint={
            selectedSession
              ? `${t.schedule.sessionWindow}: ${sessionStart || "--:--"} - ${
                  sessionEnd || "--:--"
                }`
              : t.schedule.pickClinicFirst
          }
        >
          <select
            value={form.time}
            onChange={onChange("time")}
            required
            disabled={!selectedSession}
            className={lockedFieldClass}
          >
            <option value="">{t.schedule.timePlaceholder}</option>
            {availableSlots.map((time) => (
              <option key={time} value={time}>
                {time} {t.schedule.hrs}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t.schedule.lang}>
        <div className="flex gap-2 flex-wrap mt-1">
          {prefLangs.map((language) => {
            const isActive = form.lang === language;
            return (
              <label
                key={language}
                className={`flex items-center justify-center px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  isActive
                    ? "border-teal-500 bg-teal-50 text-teal-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="lang"
                  value={language}
                  checked={isActive}
                  onChange={onChange("lang")}
                  className="sr-only"
                />
                {langLabels[language] || language}
              </label>
            );
          })}
        </div>
      </Field>
    </div>
  );
}
