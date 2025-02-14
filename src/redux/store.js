import { configureStore } from '@reduxjs/toolkit';

// Import slices (reducers)
import userReducer from './userSlice';
import appointmentReducer from './appointmentSlice';
import doctorReducer from './doctorSlice';
import alertReducer from './alertSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    alert: alertReducer
  },
});

export default store;
