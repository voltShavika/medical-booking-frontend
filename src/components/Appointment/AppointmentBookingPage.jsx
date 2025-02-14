import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createAppointment, getDoctors} from '../../api';
import {setError, setLoading} from '../../redux/appointmentSlice';
import {Button, Select, MenuItem, InputLabel, Box, Paper, Typography, Grid} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {setDoctors} from "../../redux/doctorSlice.js";
import {showAlert} from "../../redux/alertSlice.js";

const AppointmentBookingPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [doctorId, setDoctorId] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	const {doctors: doctors} = useSelector((state) => state.doctors);
	const availableDates = doctorId ? doctors.find((doctor) => doctor._id === doctorId).availableSlots.filter(slot => slot.slots.length > 0) : [];
	const availableTimes = date ? availableDates.find((availableDate) => availableDate.date === date).slots : [];

	const token = localStorage.getItem('token');

	console.log("Doctor Id", doctorId);
	console.log("Available Dates", availableDates);
	console.log("Available Times", availableTimes);

	const fetchDoctors = async () => {
		dispatch(setLoading(true));
		try {
			const data = await getDoctors(token);
			// TODO alert here
			dispatch(setDoctors(data.data));
		} catch (err) {
			dispatch(setError(err.message));
		} finally {
			dispatch(setLoading(false));
		}
	};

	useEffect(() => {
		if (token) {
			fetchDoctors();
		}
	}, [token]);


	const handleDoctorChange = (event) => {
		setDoctorId(event.target.value);
		setDate("");
		setTime("");
	};
	const handleDateChange = (e) => {
		setDate(e.target.value)
	}
	const handleTimeChange = (e) => {
		setTime(e.target.value)
	}

	const handleBookAppointment = async () => {
		try {
			const token = localStorage.getItem('token');
			const appointment = {doctorId, date, time};
			const response = await createAppointment(token, appointment);
			if(response.status){
				navigate('/dashboard')
				dispatch(showAlert({message: response.message, severity: 'success'}))
			}
			else{
				dispatch(showAlert({message: response.message, severity: 'error'}))
			}

		} catch (error) {
			dispatch(showAlert({message: error.message, severity: 'error'}))
		}
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{minHeight: '100vh', backgroundColor: '#f4f6f8'}}
		>
			<Paper sx={{padding: '20px', width: '100%', maxWidth: '500px'}}>
				<Typography variant="h4" align="center" sx={{marginBottom: '20px'}}>
					Book Appointment
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12}>
						<InputLabel id="Doctor">Doctor</InputLabel>
						<Select
							labelId="Doctor"
							label="Doctor"
							value={doctorId}
							onChange={handleDoctorChange}
							fullWidth
							variant="outlined"
						>
							<MenuItem value="">Select a Doctor</MenuItem>
							{doctors.map((doctor, i) => (
								<MenuItem key={i} value={doctor._id}>
									{doctor.name} - {doctor.speciality}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={12}>
						<InputLabel id="Date">Date</InputLabel>
						<Select
							labelId="Date"
							label="Date"
							value={date}
							onChange={handleDateChange}
							fullWidth
							variant="outlined"
						>
							<MenuItem value="">Select a Date</MenuItem>
							{availableDates.map((slot, i) => (
								<MenuItem key={i} value={slot.date}>
									{slot.date}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={12}>
						<InputLabel id="Time">Time</InputLabel>
						<Select
							labelId="Time"
							label="Time"
							value={time}
							onChange={handleTimeChange}
							fullWidth
							variant="outlined"
						>
							<MenuItem value="">Select a Time</MenuItem>
							{availableTimes.map((time, i) => (
								<MenuItem key={i} value={time}>
									{time}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={handleBookAppointment}
							sx={{marginTop: '20px'}}
						>
							Book Appointment
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};

export default AppointmentBookingPage;
