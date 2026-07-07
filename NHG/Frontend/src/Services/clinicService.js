import apiClient from "../API/api";

export const getAllClinics = async () => {
  try {
    const response = await apiClient.get("/clinics");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch clinics" };
  }
};

export const getClinicById = async (id) => {
  try {
    const response = await apiClient.get(`/clinics/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch clinic" };
  }
};

export const createClinic = async (payload) => {
  try {
    const response = await apiClient.post("/clinics", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create clinic" };
  }
};

export const updateClinic = async (id, payload) => {
  try {
    const response = await apiClient.put(`/clinics/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update clinic" };
  }
};

export const deleteClinic = async (id) => {
  try {
    const response = await apiClient.delete(`/clinics/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete clinic" };
  }
};

export const getAllClinicSessions = async () => {
  try {
    const response = await apiClient.get("/clinic-sessions");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch clinic sessions" };
  }
};

export const getClinicSessionById = async (id) => {
  try {
    const response = await apiClient.get(`/clinic-sessions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch clinic session" };
  }
};

export const createClinicSession = async (payload) => {
  try {
    const response = await apiClient.post("/clinic-sessions", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create clinic session" };
  }
};

export const updateClinicSession = async (id, payload) => {
  try {
    const response = await apiClient.put(`/clinic-sessions/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update clinic session" };
  }
};

export const deleteClinicSession = async (id) => {
  try {
    const response = await apiClient.delete(`/clinic-sessions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete clinic session" };
  }
};
