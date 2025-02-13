import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments(state, action) {
      state.items = action.payload;
    },
    addAppointment(state, action) {
      state.items.push(action.payload);
    },
    updateAppointment(state, action) {
      const index = state.items.findIndex((appointment) => appointment.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteAppointment(state, action) {
      state.items = state.items.filter((appointment) => appointment.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setAppointments, addAppointment, updateAppointment, deleteAppointment, setLoading, setError } = appointmentSlice.actions;

export default appointmentSlice.reducer;
