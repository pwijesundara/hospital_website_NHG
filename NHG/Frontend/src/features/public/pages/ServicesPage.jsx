import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";

const categories = [
  {
    label: "Emergency & Critical Care",
    icon: "ti-urgent",
    color: { bg: "bg-red-50", icon: "text-red-600", badge: "bg-red-50 text-red-700 border-red-100" },
    services: [
      { name: "24/7 Emergency Unit",       desc: "Round-the-clock emergency and trauma care with dedicated resuscitation bays and triage." },
      { name: "Intensive Care Unit (ICU)", desc: "Multi-specialty ICU with advanced monitoring, ventilator support and critical care specialists." },
      { name: "Coronary Care Unit (CCU)",  desc: "Specialised cardiac monitoring and intervention for acute coronary events." },
    ],
  },
  {
    label: "Outpatient & Clinics",
    icon: "ti-stethoscope",
    color: { bg: "bg-teal-50", icon: "text-teal-700", badge: "bg-teal-50 text-teal-700 border-teal-100" },
    services: [
      { name: "General OPD",              desc: "Walk-in and appointment-based outpatient consultations with general medical officers." },
      { name: "Specialist Clinics",       desc: "Scheduled clinics across cardiology, neurology, endocrinology, nephrology and more." },
      { name: "Diabetic & Hypertension Clinic", desc: "Dedicated chronic disease management with dietary counselling and monitoring." },
      { name: "Paediatric OPD",           desc: "Child health assessments, immunisation and specialist paediatric consultations." },
    ],
  },
  {
    label: "Surgery & Operating Theatres",
    icon: "ti-scalpel",
    color: { bg: "bg-blue-50", icon: "text-blue-700", badge: "bg-blue-50 text-blue-700 border-blue-100" },
    services: [
      { name: "General Surgery",          desc: "Appendicectomy, hernia repair, cholecystectomy and other elective and emergency procedures." },
      { name: "Laparoscopic Surgery",     desc: "Minimally invasive abdominal and gynaecological procedures with faster recovery." },
      { name: "Orthopaedic Surgery",      desc: "Fracture fixation, joint replacement and bone trauma management." },
      { name: "ENT Surgery",              desc: "Tonsillectomy, septoplasty, myringotomy and other ear, nose and throat procedures." },
      { name: "Ophthalmology Surgery",    desc: "Cataract extraction, glaucoma procedures and minor eye surgeries." },
    ],
  },
  {
    label: "Maternity & Women's Health",
    icon: "ti-baby-carriage",
    color: { bg: "bg-pink-50", icon: "text-pink-700", badge: "bg-pink-50 text-pink-700 border-pink-100" },
    services: [
      { name: "Antenatal Clinics",        desc: "Regular check-ups, ultrasound monitoring and nutritional guidance throughout pregnancy." },
      { name: "Labour & Delivery",        desc: "24-hour midwifery and obstetric support for normal and high-risk deliveries." },
      { name: "Neonatal ICU (NICU)",      desc: "Intensive care for premature and critically ill newborns with specialist neonatal teams." },
      { name: "Gynaecology",             desc: "Management of gynaecological conditions, family planning and minimally invasive procedures." },
    ],
  },
  {
    label: "Diagnostics & Imaging",
    icon: "ti-scan",
    color: { bg: "bg-purple-50", icon: "text-purple-700", badge: "bg-purple-50 text-purple-700 border-purple-100" },
    services: [
      { name: "3T MRI Scanning",          desc: "High-resolution magnetic resonance imaging for neurological and musculoskeletal conditions." },
      { name: "CT Scanning",              desc: "Multi-slice CT for chest, abdomen, head and emergency trauma imaging." },
      { name: "Digital X-ray & PACS",     desc: "Fully digital radiography with PACS-integrated reporting and instant image access." },
      { name: "Ultrasound",               desc: "Abdominal, obstetric, cardiac and musculoskeletal ultrasound with Doppler capability." },
      { name: "Echocardiography",         desc: "2D and Doppler echo for cardiac structure and function assessment." },
    ],
  },
  {
    label: "Laboratory Services",
    icon: "ti-flask",
    color: { bg: "bg-amber-50", icon: "text-amber-700", badge: "bg-amber-50 text-amber-700 border-amber-100" },
    services: [
      { name: "Haematology",              desc: "Full blood counts, coagulation profiles and peripheral smear analysis." },
      { name: "Biochemistry",             desc: "Liver, renal, thyroid, lipid and metabolic panels with automated analysers." },
      { name: "Microbiology & Culture",   desc: "Bacterial and fungal culture, sensitivity testing and infectious disease serology." },
      { name: "Histopathology",           desc: "Tissue biopsy analysis, cytology and intraoperative frozen section." },
      { name: "Blood Bank",               desc: "Cross-matching, component therapy and 24-hour emergency blood supply." },
    ],
  },
  {
    label: "Rehabilitation & Therapy",
    icon: "ti-wheelchair",
    color: { bg: "bg-green-50", icon: "text-green-700", badge: "bg-green-50 text-green-700 border-green-100" },
    services: [
      { name: "Physiotherapy",            desc: "Post-surgical, neurological and musculoskeletal rehabilitation programmes." },
      { name: "Occupational Therapy",     desc: "Functional recovery and daily living skills for patients with disability or injury." },
      { name: "Speech & Language Therapy",desc: "Assessment and therapy for swallowing disorders and communication difficulties." },
    ],
  },
  {
    label: "Pharmacy & Support",
    icon: "ti-pill",
    color: { bg: "bg-slate-50", icon: "text-slate-600", badge: "bg-slate-50 text-slate-600 border-slate-200" },
    services: [
      { name: "Inpatient Pharmacy",       desc: "Ward-based dispensing with barcode verification and clinical pharmacist review." },
      { name: "Outpatient Pharmacy",      desc: "Prescription dispensing for OPD patients with multilingual counselling." },
      { name: "Nutritional Support",      desc: "Dietitian-led nutritional assessment and enteral/parenteral nutrition planning." },
      { name: "Social Services",          desc: "Patient welfare, discharge planning and community care coordination." },
    ],
  },
];

const highlights = [
  { value: "40+",  label: "Specialties",      icon: "ti-award",        color: "text-teal-700"  },
  { value: "24/7", label: "Emergency care",   icon: "ti-urgent",       color: "text-red-600"   },
  { value: "3",    label: "Languages served", icon: "ti-language",     color: "text-purple-700"},
  { value: "500K+",label: "Patients/year",    icon: "ti-users",        color: "text-blue-700"  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* ── Hero ── */}
        <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl px-6 py-6 mb-6">
          <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
            <i className="ti ti-heart-rate-monitor text-2xl text-teal-700" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-xl font-semibold text-gray-900 mb-1.5">
              Clinical Services
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Comprehensive healthcare across emergency, surgical, diagnostic, maternity and
              rehabilitation services — delivered in English, Sinhala and Tamil.
            </p>
          </div>
        </div>

        {/* ── Highlights ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="bg-white border border-gray-200 rounded-xl px-4 py-5 flex flex-col items-center text-center"
            >
              <i className={`ti ${h.icon} text-xl mb-1 ${h.color}`} aria-hidden="true" />
              <span className={`text-2xl font-semibold tracking-tight ${h.color}`}>{h.value}</span>
              <span className="text-xs text-gray-400 mt-0.5">{h.label}</span>
            </div>
          ))}
        </div>

        {/* ── Service categories ── */}
        <div className="flex flex-col gap-6">
          {categories.map((cat) => (
            <div key={cat.label}>
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-7 h-7 rounded-lg ${cat.color.bg} flex items-center justify-center flex-shrink-0`}>
                  <i className={`ti ${cat.icon} text-base ${cat.color.icon}`} aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-gray-800">{cat.label}</p>
              </div>

              {/* Service cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.services.map((s) => (
                  <div
                    key={s.name}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${cat.color.badge} mt-0.5 whitespace-nowrap`}
                      >
                        {cat.label.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Contact strip ── */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900 mb-0.5">Need help finding the right service?</p>
            <p className="text-xs text-gray-500">Call our helpline or visit the OPD registration desk.</p>
          </div>
          <div className="flex items-center gap-2 text-red-600 flex-shrink-0">
            <i className="ti ti-phone text-base" aria-hidden="true" />
            <span className="text-sm font-semibold">1990 · 24/7 Emergency</span>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}