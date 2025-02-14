import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	open: false,
	severity: 'success',
	message: ''

};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert(state, action) {
			state.open = true;
			state.message = action.payload.message;
			state.severity = action.payload.severity;
		},

		closeAlert(state, action) {
			state.open = false;
		},
	},
});

export const {showAlert, closeAlert} = alertSlice.actions;

export default alertSlice.reducer;
