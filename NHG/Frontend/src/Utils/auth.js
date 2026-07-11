export const ROLE = {
  ADMIN: "ADMIN",
  CONSULTANT: "CONSULTANT",
  DOCTOR: "DOCTOR",
  LAB: "LAB",
  NURSE: "NURSE",
  PATIENT: "PATIENT",
};

const ROLE_ALIASES = {
  ADIMN: ROLE.ADMIN,
};

export const normalizeRole = (role) => {
  const normalizedRole = String(role || "").trim().toUpperCase();
  return ROLE_ALIASES[normalizedRole] || normalizedRole;
};

export const getAuthData = () => {
  try {
    const authData = JSON.parse(localStorage.getItem("authData") || "null");
    if (!authData) return null;

    return {
      ...authData,
      role: normalizeRole(authData.role),
    };
  } catch {
    return null;
  }
};

export const hasRole = (allowedRoles, role) =>
  allowedRoles.includes(normalizeRole(role));
