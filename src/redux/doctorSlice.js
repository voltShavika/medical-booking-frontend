import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [],
  specialities: [],
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setDoctors(state, action) {
      state.doctors = action.payload;
    },
    setSpecialities(state, action) {
      state.specialities = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setDoctors, setSpecialities, setLoading, setError } = doctorSlice.actions;

export default doctorSlice.reducer;
