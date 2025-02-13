import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createAppointment, getDoctors} from '../../api';
import {setError, setLoading} from '../../redux/appointmentSlice';
import {Button, Select, MenuItem, InputLabel} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {setDoctors} from "../../redux/doctorSlice.js";

const AppointmentBookingPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [doctorId, setDoctorId] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	const {doctors: doctors} = useSelector((state) => state.doctors);
    const availableDates = doctorId ? doctors.find((doctor) => doctor._id === doctorId).availableSlots : [];
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
			const newAppointment = await createAppointment(token, appointment);
			// dispatch(addAppointment(newAppointment));
			// history.push('/dashboard');
			navigate('/dashboard')
		} catch (error) {
			console.error('Error booking appointment:', error);
		}
	};

	return (
		<div>
			<h2>Book Appointment</h2>
            <InputLabel id="Doctor">Doctor</InputLabel>
			<Select
				labelId="Doctor"
                label="Doctor"
				value={doctorId}
				onChange={handleDoctorChange}
				fullWidth
                variant={"outlined"}
			>
				<MenuItem value="">Select a Doctor</MenuItem>
				{
					doctors.map((doctor, i) => (
						<MenuItem key={i} value={doctor._id}>{doctor.name}</MenuItem>
					))
				}
			</Select>
            <InputLabel id="Date">Date</InputLabel>
			<Select
				labelId="Date"
                label="Date"
				value={date}
				onChange={handleDateChange}
				fullWidth
                variant={"outlined"}
			>
				<MenuItem value="">Select a Date</MenuItem> {/* Option for no selection */}
				{
					availableDates.map((slot, i) => (
						<MenuItem key={i} value={slot.date}>{slot.date}</MenuItem>
					))
				}
			</Select>
            <InputLabel id="Time">Time</InputLabel> {/* Add InputLabel */}
            <Select
				labelId="Time"
                label="Time"
				value={time}
				onChange={handleTimeChange}
				fullWidth
                variant={"outlined"}
			>
				<MenuItem value="">Select a Time</MenuItem> {/* Option for no selection */}
				{
					availableTimes.map((time, i) => (
						<MenuItem key={i} value={time}>{time}</MenuItem>
					))
				}
			</Select>
			<Button variant={"contained"} onClick={handleBookAppointment}>Book Appointment</Button>
		</div>
	);
};

export default AppointmentBookingPage;
