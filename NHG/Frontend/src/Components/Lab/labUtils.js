export const EMPTY_LAB_FORM = {
  testName: "",
  category: "",
  price: "",
  turnaroundTime: "",
  status: "ACTIVE",
  description: "",
  firstName: "",
  lastName: "",
  nic: "",
  dob: "",
  mobile: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const LAB_STATUSES = ["ACTIVE", "INACTIVE"];

export const getLabId = (lab) => lab?.id ?? lab?._id ?? lab?.labId;

export const getUploadStorageKey = (authData) =>
  `patientLabUploads:${authData?.id || authData?.email || "current"}`;

export const asArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.labs)) return data.labs;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.reports)) return data.reports;
  return [];
};

export const buildLabPayload = (form) => ({
  testName: form.testName.trim(),
  category: form.category.trim(),
  price: form.price === "" ? null : Number(form.price),
  turnaroundTime: form.turnaroundTime.trim() || null,
  status: form.status,
  description: form.description.trim() || null,
});

export const buildLabUserPayload = (form) => ({
  firstName: form.firstName.trim(),
  lastName: form.lastName.trim(),
  nic: form.nic.trim(),
  dob: form.dob,
  mobile: form.mobile.trim(),
  address: form.address.trim(),
  email: form.email.trim(),
  password: form.password,
  confirmPassword: form.confirmPassword,
});

export const validateLabForm = (form, mode = "create") => {
  const nextErrors = {};
  if (!form.testName.trim()) nextErrors.testName = "Test name is required.";
  if (!form.category.trim()) nextErrors.category = "Category is required.";
  if (form.price && Number(form.price) < 0) {
    nextErrors.price = "Price cannot be negative.";
  }

  if (mode === "create") {
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!form.nic.trim()) nextErrors.nic = "NIC is required.";
    if (!form.dob) nextErrors.dob = "Date of birth is required.";
    if (!form.mobile.trim()) nextErrors.mobile = "Mobile number is required.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.password) nextErrors.password = "Password is required.";
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Confirm password is required.";
    }
    if (form.password && form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
  }

  return nextErrors;
};
