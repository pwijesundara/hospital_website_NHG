export const EMPTY_LAB_FORM = {
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

export const getLabId = (lab) => lab?.id ?? lab?._id ?? lab?.labId;

export const asArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.labs)) return data.labs;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.reports)) return data.reports;
  return [];
};

export const unwrapLab = (data) => data?.data ?? data?.lab ?? data;

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

export const buildLabUpdatePayload = (form) => ({
  firstName: form.firstName.trim(),
  lastName: form.lastName.trim(),
  nic: form.nic.trim(),
  dob: form.dob,
  mobile: form.mobile.trim(),
  address: form.address.trim(),
  email: form.email.trim(),
});

export const validateLabForm = (form, mode = "create") => {
  const nextErrors = {};

  if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
  if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";
  if (!form.nic.trim()) nextErrors.nic = "NIC is required.";
  if (!form.dob) nextErrors.dob = "Date of birth is required.";
  if (!form.mobile.trim()) nextErrors.mobile = "Mobile number is required.";
  if (!form.address.trim()) nextErrors.address = "Address is required.";
  if (!form.email.trim()) nextErrors.email = "Email is required.";

  if (mode === "create") {
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
