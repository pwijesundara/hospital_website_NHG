import apiClient from "../API/api";

export const getAllPatients = async () => {
  try {
    const response = await apiClient.get('/patients');
    return response.data; // Returns the array of all patients
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch all patients' };
  }
};

export const updatePatient = async (id, payload) => {
  try {
    const response = await apiClient.put(`/patients/${id}`, payload);
    return response.data;
  } catch (error) {

    throw error.response?.data || { message: 'Failed to update patient data' };
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await apiClient.delete(`/patients/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete patient record' };
  }
};