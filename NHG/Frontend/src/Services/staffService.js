import apiClient from "../API/api";

export const getAllConsultants = async () => {
  try {
    const response = await apiClient.get("/consultants");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch consultants" };
  }
};

export const getConsultantById = async (id) => {
  try {
    const response = await apiClient.get(`/consultants/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch consultant" };
  }
};

export const updateConsultant = async (id, payload) => {
  try {
    const response = await apiClient.put(`/consultants/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update consultant" };
  }
};

export const deleteConsultant = async (id) => {
  try {
    const response = await apiClient.delete(`/consultants/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete consultant" };
  }
};

export const getAllNurses = async () => {
  try {
    const response = await apiClient.get("/nurses");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch nurses" };
  }
};

export const getNurseById = async (id) => {
  try {
    const response = await apiClient.get(`/nurses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch nurse" };
  }
};

export const updateNurse = async (id, payload) => {
  try {
    const response = await apiClient.put(`/nurses/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update nurse" };
  }
};

export const deleteNurse = async (id) => {
  try {
    const response = await apiClient.delete(`/nurses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete nurse" };
  }
};
