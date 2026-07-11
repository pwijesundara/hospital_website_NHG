import apiClient from "../../../shared/api/api";

export const registerDoctor = async (data) => {
  try {
    const response = await apiClient.post("/auth/doctor/register", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Doctor registration failed" };
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await apiClient.get("/doctors");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch doctors" };
  }
};

export const updateDoctor = async (id, data) => {
  try {
    const response = await apiClient.put(`/doctors/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update doctor" };
  }
};

export const deleteDoctor = async (id) => {
  try {
    const response = await apiClient.delete(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete doctor" };
  }
};