import apiClient from "../API/api.js";

export const getAllLabs = async () => {
  try {
    const response = await apiClient.get("/labs");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab records" };
  }
};

export const createLab = async (payload) => {
  try {
    const response = await apiClient.post("/labs", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create lab record" };
  }
};

export const updateLab = async (id, payload) => {
  try {
    const response = await apiClient.put(`/labs/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update lab record" };
  }
};

export const deleteLab = async (id) => {
  try {
    const response = await apiClient.delete(`/labs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete lab record" };
  }
};

export const submitLabReport = async ({ patientPhoneNumber, description, report }) => {
  try {
    const formData = new FormData();
    formData.append("patientPhoneNumber", patientPhoneNumber);
    formData.append("description", description);
    formData.append("report", report);

    const response = await apiClient.post("/lab/reports", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to submit lab report" };
  }
};

export const getLabReportsByPatientPhone = async (phoneNumber) => {
  try {
    const response = await apiClient.get(`/lab/patients/${phoneNumber}/reports`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab reports" };
  }
};
