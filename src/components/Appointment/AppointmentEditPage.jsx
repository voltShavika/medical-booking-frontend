import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createAppointment, getDoctors, updateAppointment} from '../../api';
import {setError, setLoading} from '../../redux/appointmentSlice';
import {Button, Select, MenuItem, InputLabel, Box, Paper, Typography, Grid} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import {setDoctors} from "../../redux/doctorSlice.js";

const AppointmentEditPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const appointment = location.state;
	if (!appointment) {
		navigate('/dashboard');
	}

	const [doctorId, setDoctorId] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	const {doctors: doctors} = useSelector((state) => state.doctors);
	console.log("Doctors", doctors);
	const availableDates = doctorId && doctors && doctors.length > 0 ? doctors.find((doctor) => doctor._id === doctorId)?.availableSlots : [];
	const availableTimes = date && availableDates && availableDates.length > 0 ? availableDates.find((availableDate) => availableDate.date === date)?.slots.concat(time) : [];

	const token = localStorage.getItem('token');

	console.log("Doctor Id", doctorId);
	console.log("Date", date);
	console.log("Time", time);
	console.log("Available Dates", availableDates);
	console.log("Available Times", availableTimes);


	const fetchDoctors = async () => {
		dispatch(setLoading(true));
		try {
			const data = await getDoctors(token);
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

	useEffect(() => {
		if (doctors && doctors.length > 0 && appointment?.doctor?._id) {
			setDoctorId(appointment.doctor._id);
			setDate(appointment.date);
			setTime(appointment.time);
		}

	}, [doctors, appointment]);


	const handleDoctorChange = (event) => {
		setDoctorId(event.target.value);
		setDate("");
		setTime("");
	};
	const handleDateChange = (e) => {
		setDate(e.target.value);
		setTime('');
	}
	const handleTimeChange = (e) => {
		setTime(e.target.value);
	}

	const handleEditAppointment = async () => {
		try {
			const token = localStorage.getItem('token');
			const payload = {_id: appointment._id, doctorId, date, time};
			const response = await updateAppointment(token, payload);
			if (response.status) {
				// dispatch(addAppointment(newAppointment));
				// history.push('/dashboard');
				navigate('/dashboard')
			} else {
				alert(response.message);
			}

		} catch (error) {
			console.error('Error booking appointment:', error);
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
					Edit Appointment
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
									{doctor.name}
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
							{availableDates && Array.isArray(availableDates) && availableDates.map((slot, i) => (
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
							{availableTimes && Array.isArray(availableTimes) && availableTimes.map((time, i) => (
								<MenuItem key={i} value={time}>
									{time}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid container spacing={2} padding={4}>
						<Grid item xs={6}>
							<Button
								variant="outlined"
								color="error"
								fullWidth
								onClick={() => navigate('/dashboard')}
								sx={{padding: '10px'}}
							>
								Back
							</Button>
						</Grid>

						<Grid item xs={6}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								onClick={handleEditAppointment}
								sx={{padding: '10px'}}
							>
								Edit Appointment
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};

export default AppointmentEditPage;
