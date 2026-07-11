export const EMPTY_APPOINTMENT_FORM = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  nic: "",
  phone: "",
  email: "",
  address: "",
  type: "",
  department: "",
  doctor: "",
  date: "",
  time: "",
  reason: "",
  existing: "no",
  referral: "no",
  referralDoc: "",
  lang: "English",
  consent: false,
};

export const departments = [
  { value: "", label: "Select department" },
  { value: "emergency", label: "Emergency & Critical Care" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "surgery", label: "Surgery" },
  { value: "obgyn", label: "Obstetrics & Gynaecology" },
  { value: "paediatrics", label: "Paediatrics" },
  { value: "medicine", label: "Internal Medicine" },
  { value: "ortho", label: "Orthopaedics" },
  { value: "ent", label: "ENT" },
  { value: "ophthalmology", label: "Ophthalmology" },
  { value: "radiology", label: "Radiology & Diagnostics" },
  { value: "dermatology", label: "Dermatology" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "dental", label: "Dental & Oral Health" },
];

export const doctorsByDept = {
  cardiology: ["Dr. Kasun Wickramasinghe", "Dr. Meera Krishnamurthy"],
  neurology: ["Dr. Ranjith Fernando", "Dr. Ananthi Navaratnam"],
  surgery: [
    "Dr. Chaminda Jayasuriya",
    "Dr. Tharaka Mendis",
    "Dr. Kavitha Balasundaram",
  ],
  obgyn: ["Dr. Sandya Abeysekera", "Dr. Usha Rajagopal"],
  paediatrics: ["Dr. Dilhani Gunasekara", "Dr. Santhosh Ponnusamy"],
  medicine: [
    "Dr. Rohan Dissanayake",
    "Dr. Lalitha Subramaniam",
    "Dr. Asanka Ratnaweera",
  ],
  ortho: ["Dr. Kavitha Balasundaram", "Dr. Pradeep Senanayake"],
  ent: ["Dr. Janaka Bandara", "Dr. Nirmala Suresh"],
  ophthalmology: ["Dr. Shanti Perumal", "Dr. Gayan Ekanayake"],
  radiology: ["Dr. Mahesh Karunanayake", "Dr. Vijaya Thilakasiri"],
  dermatology: ["Dr. Renuka Jayawardena"],
  psychiatry: ["Dr. Saman Samaraweera", "Dr. Preethi Wijesekara"],
  dental: ["Dr. Amara Gunawardena", "Dr. Niluka Dias"],
  emergency: ["Dr. Priya Ratnayake", "Dr. Arjun Sivakumar"],
};

export const appointmentTypes = [
  {
    value: "opd",
    label: "OPD Consultation",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    desc: "General outpatient visit with a doctor",
  },
  {
    value: "specialist",
    label: "Specialist Clinic",
    icon: (
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M20 8v6M23 11h-6M9 7a4 4 0 100-8 4 4 0 000 8z" />
    ),
    desc: "Scheduled specialist appointment",
  },
  {
    value: "followup",
    label: "Follow-up Visit",
    icon: (
      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    ),
    desc: "Continuing care after a previous visit",
  },
  {
    value: "procedure",
    label: "Procedure / Test",
    icon: <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />,
    desc: "Scheduled diagnostic or minor procedure",
  },
];

export const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

export const prefLangs = ["English", "Sinhala", "Tamil"];
