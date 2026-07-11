import apiClient from '../API/api.js';

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/signin', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Register user
export const registerUser = async (patientData) => {
  try {
    // Spreading or passing patientData sends the exact JSON structure your backend requires
    const response = await apiClient.post('/auth/patient/register', patientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Register lab user
export const registerLabUser = async (labData) => {
  try {
    const response = await apiClient.post('/auth/lab/register', labData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lab registration failed' };
  }
};

// Register consultant user
export const registerConsultantUser = async (consultantData) => {
  try {
    const response = await apiClient.post('/auth/consultant/register', consultantData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Consultant registration failed' };
  }
};

// Register nurse user
export const registerNurseUser = async (nurseData) => {
  try {
    const response = await apiClient.post('/auth/nurse/register', nurseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Nurse registration failed' };
  }
};


// Request password reset token
export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send reset email' };
  }
};

// Reset password with token from email
export const resetPassword = async ({ token, newPassword, confirmPassword }) => {
  try {
    const response = await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to reset password' };
  }
};


// Logout user
export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};
