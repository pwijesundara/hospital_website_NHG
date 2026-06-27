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


// Logout user
export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};
