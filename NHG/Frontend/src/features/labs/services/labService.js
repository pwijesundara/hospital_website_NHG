import apiClient from "../../../shared/api/api.js";

export const getAllLabs = async () => {
  try {
    const response = await apiClient.get("/labs");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab records" };
  }
};

export const getLabById = async (id) => {
  try {
    const response = await apiClient.get(`/labs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab record" };
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

export const createLabReportByPhone = async ({
  patientPhoneNumber,
  description,
  report,
}) => {
  try {
    const formData = new FormData();
    formData.append("patientPhoneNumber", patientPhoneNumber);
    formData.append("description", description);
    formData.append("report", report);

    const response = await apiClient.post("/lab/reports", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create lab report" };
  }
};

export const getAllLabReports = async () => {
  try {
    const response = await apiClient.get("/lab/reports");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab reports" };
  }
};

export const createLabReportByPatientId = async ({
  patientId,
  description,
  report,
}) => {
  try {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("report", report);

    const response = await apiClient.post(
      `/lab/patients/${patientId}/reports`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create lab report" };
  }
};

export const getLabReportsByPatientPhone = async (phoneNumber) => {
  try {
    const response = await apiClient.get(`/lab/patients/phone/${phoneNumber}/reports`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab reports" };
  }
};

export const getLabReportsByPatientId = async (patientId) => {
  try {
    const response = await apiClient.get(`/lab/patients/${patientId}/reports`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab reports" };
  }
};

export const getLabReportPdf = async (reportId) => {
  try {
    const response = await apiClient.get(`/lab/reports/${reportId}/pdf`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab report PDF" };
  }
};

export const getMyLabReports = async (patientId) => {
  try {
    const response = await apiClient.get(`/lab/patients/${patientId}/reports`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab reports" };
  }
};
