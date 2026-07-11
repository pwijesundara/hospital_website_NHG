export const EMPTY_CLINIC_FORM = {
  clinicName: "",
  description: "",
  consultantId: "",
  doctorIds: [],
};

export const EMPTY_SESSION_FORM = {
  clinicId: "",
  clinicDate: "",
  startTime: "",
  endTime: "",
  location: "",
  description: "",
  maximumPatients: "",
};

export const asArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

export const getEntityId = (item) =>
  item?.id ??
  item?.clinicId ??
  item?.doctorId ??
  item?.consultantId ??
  item?.userId ??
  item?.sessionId ??
  item?.clinicSessionId;

export const getSessionClinicId = (session) =>
  session?.clinicId ?? getEntityId(session?.clinic);

export const normalizeTime = (value) => (value ? String(value).slice(0, 5) : "");

export const toApiTime = (value) => (value && value.length === 5 ? `${value}:00` : value);

export const inputCls = (error) =>
  `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
  }`;

export const doctorName = (doctor) =>
  [doctor?.title, doctor?.firstName, doctor?.lastName].filter(Boolean).join(" ") ||
  doctor?.name ||
  doctor?.email ||
  `Doctor ${getEntityId(doctor)}`;

export const consultantName = (consultant) =>
  [consultant?.firstName, consultant?.lastName].filter(Boolean).join(" ") ||
  consultant?.name ||
  consultant?.email ||
  `Consultant ${getEntityId(consultant)}`;

export const getClinicDoctorIds = (clinic) =>
  clinic?.doctorIds || clinic?.doctors?.map(getEntityId).filter(Boolean) || [];

export const getClinicConsultantId = (clinic) =>
  clinic?.consultantId ?? getEntityId(clinic?.consultant);

export const getConsultantId = (consultant) =>
  consultant?.id ?? consultant?.consultantId ?? consultant?.userId;

export const isClinicAssignedToDoctor = (clinic, authData) => {
  const authIds = [authData?.id, authData?.doctorId, authData?.userId]
    .filter(Boolean)
    .map(String);
  const doctorIds = getClinicDoctorIds(clinic).map(String);
  const assignedById = authIds.some((id) => doctorIds.includes(id));
  const assignedByEmail = clinic?.doctors?.some(
    (doctor) => authData?.email && doctor?.email?.toLowerCase() === authData.email.toLowerCase()
  );

  return assignedById || assignedByEmail;
};
