import { configureStore } from '@reduxjs/toolkit';

// Import slices (reducers)
import userReducer from './userSlice';
import appointmentReducer from './appointmentSlice';
import doctorReducer from './doctorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer
  },
});

export default store;
