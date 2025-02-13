import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Backend API base URL
});

// User API Calls
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.log(error.message)
    throw new Error('Error logging in');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error registering user');
  }
};

export const getDoctors = async (token) => {
  try {
    const response = await api.get('/doctors', {
      headers: { authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors');
  }
};

// Appointment API Calls
export const getAppointments = async (token) => {
  try {
    const response = await api.get('/appointments', {
      headers: { authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching appointments');
  }
};

export const createAppointment = async (token, appointment) => {
  try {
    const response = await api.post('/appointments', appointment, {
      headers: { authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error booking appointment');
  }
};

export const updateAppointment = async (token, appointment) => {
  try {
    const response = await api.put(`/appointments/${appointment._id}`, appointment, {
      headers: { authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error updating appointment');
  }
};

export const deleteAppointment = async (token, appointmentId) => {
  try {
    const response = await api.delete(`/appointments/${appointmentId}`, {
      headers: { authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error cancelling appointment');
  }
};
