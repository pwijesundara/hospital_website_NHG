import apiClient from './api';

// Get current user data
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/user');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user data' };
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await apiClient.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};

// Change password
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await apiClient.post('/user/change-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to change password' };
  }
};
