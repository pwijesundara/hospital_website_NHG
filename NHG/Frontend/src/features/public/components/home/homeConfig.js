export const LIVE_QUEUES = [
  { id: 1, label: "OPD - General", count: 47, critical: false },
  { id: 2, label: "Cardiology Clinic", count: 23, critical: false },
  { id: 3, label: "Pediatrics OPD", count: 31, critical: false },
  { id: 4, label: "Maternity Clinic", count: 58, critical: true },
  { id: 5, label: "Emergency / Ambulance", count: null, critical: false },
];

export const SPECIALTIES = [
  {
    icon: "Heart",
    name: "Cardiology & ICU",
    desc: "Cardiac cath, angiography, ECG, echocardiography, coronary care and advanced cardiac procedures.",
  },
  {
    icon: "Care",
    name: "Maternity & Gynaecology",
    desc: "Antenatal care, safe delivery, postnatal services, NICU and comprehensive gynaecological procedures.",
  },
  {
    icon: "Surgery",
    name: "Surgery",
    desc: "General, orthopedic, laparoscopic, neuro and plastic surgeons with modern operation theatres.",
  },
  {
    icon: "Child",
    name: "Pediatrics & Neonatology",
    desc: "Children's ward, neonatal ICU, developmental clinics and child welfare services.",
  },
  {
    icon: "Scan",
    name: "Radiology & Imaging",
    desc: "X-ray, CT scan, MRI, ultrasound and PACS-integrated digital imaging with 3T MRI.",
  },
  {
    icon: "Lab",
    name: "Laboratory & Pathology",
    desc: "Haematology, biochemistry, microbiology, histopathology with LIMS integration.",
  },
];

export const STATS = [
  { num: "1,200+", label: "Hospital Beds" },
  { num: "40+", label: "Medical Specialties" },
  { num: "850+", label: "Medical Staff" },
  { num: "500K+", label: "Patients / Year" },
  { num: "3", label: "Languages Supported" },
];

export const NEWS = [
  {
    tag: "Health Alert",
    tagColor: "bg-red-50 text-red-700 border-red-100",
    title: "Dengue Campaign Launched in Southern Province",
    desc: "Health teams conducting community outreach to prevent dengue spread this season.",
    date: "May 3, 2026",
  },
  {
    tag: "Facility Improve",
    tagColor: "bg-blue-50 text-blue-700 border-blue-100",
    title: "New 3T MRI Unit Inaugurated at Radiology Department",
    desc: "State-of-the-art 3T MRI unit offering specialised, improved diagnostic imaging capacity.",
    date: "April 28, 2026",
  },
  {
    tag: "Online",
    tagColor: "bg-green-50 text-green-700 border-green-100",
    title: "Online Appointment System Now Live for All OPD Departments",
    desc: "Patients can now book, reschedule or cancel appointments from the hospital website.",
    date: "April 22, 2026",
  },
];

export const DOCTOR_CARD_COLORS = [
  "bg-teal-600",
  "bg-purple-600",
  "bg-emerald-600",
  "bg-blue-600",
  "bg-rose-600",
  "bg-amber-600",
];

export const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.doctors)) return data.doctors;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.content)) return data.content;
  return [];
};

export const getDoctorId = (doctor, index) =>
  doctor?.id ?? doctor?.doctorId ?? doctor?.userId ?? doctor?.email ?? index;

export const getDoctorName = (doctor) =>
  [doctor?.title, doctor?.firstName, doctor?.lastName].filter(Boolean).join(" ") ||
  doctor?.name ||
  doctor?.email ||
  "Doctor";

export const getDoctorInitials = (doctor) => {
  const parts = [doctor?.firstName, doctor?.lastName].filter(Boolean);

  if (parts.length) {
    return parts.map((part) => part.charAt(0)).join("").slice(0, 2).toUpperCase();
  }

  return getDoctorName(doctor)
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};
