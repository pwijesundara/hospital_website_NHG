import { getStoredAuthDataSync } from "../../utils/authStorage";

export const ROLE = {
  ADMIN: "ADMIN",
  CONSULTANT: "CONSULTANT",
  DOCTOR: "DOCTOR",
  LAB: "LAB",
  NURSE: "NURSE",
  PATIENT: "PATIENT",
};

export const normalizeRole = (role) => {
  return String(role || "").trim().toUpperCase();
};

export const getAuthData = () => {
  try {
    const authData = getStoredAuthDataSync();
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
