import { translations } from "../data/bookAppointmentI18n";
import AppointmentIntro from "./AppointmentIntro";
import AppointmentTypeSection from "./AppointmentTypeSection";
import HelpDeskStrip from "./HelpDeskStrip";
import MedicalContextSection from "./MedicalContextSection";
import PersonalDetailsSection from "./PersonalDetailsSection";
import ScheduleSection from "./ScheduleSection";
import SubmitSection from "./SubmitSection";
import { IconWrapper } from "./bookAppointmentUi";

const UI_LANGS = [
  { code: "en", label: "English" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
];

export default function BookAppointmentForm({
  form,
  uiLang,
  onSetLang,
  patientDetailsError,
  patientDetailsLoading,
  submitError,
  submitLoading,
  onChange,
  onSubmit,
}) {
  const t = translations[uiLang] || translations.en;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-end gap-2 mb-4">
        <IconWrapper size={14} className="text-teal-700">
          <path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
        </IconWrapper>
        <div className="flex items-center gap-1 border border-slate-200 bg-white rounded-xl shadow-sm p-1">
          {UI_LANGS.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => onSetLang(code)}
              aria-pressed={uiLang === code}
              className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all active:scale-98 ${
                uiLang === code
                  ? "bg-teal-700 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <AppointmentIntro t={t} />

      <form onSubmit={onSubmit} className="space-y-6">
        <PersonalDetailsSection
          form={form}
          t={t}
          uiLang={uiLang}
          loading={patientDetailsLoading}
          error={patientDetailsError}
          onChange={onChange}
        />
        <AppointmentTypeSection
          selectedType={form.type}
          t={t}
          onChange={onChange}
        />
        <ScheduleSection form={form} t={t} uiLang={uiLang} onChange={onChange} />
        <MedicalContextSection
          reason={form.reason}
          t={t}
          onChange={onChange}
        />
        <SubmitSection
          consent={form.consent}
          t={t}
          error={submitError}
          loading={submitLoading}
          onChange={onChange}
        />
        <HelpDeskStrip t={t} />
      </form>
    </div>
  );
}
