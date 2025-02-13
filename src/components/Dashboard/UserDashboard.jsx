import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAppointments, deleteAppointment, setLoading, setError} from '../../redux/appointmentSlice';
import {getAppointments, deleteAppointment as deleteApiAppointment} from '../../api';
import {Button, CircularProgress, Grid, Card, CardContent, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const UserDashboard = () => {
	const dispatch = useDispatch();
    const navigate = useNavigate();
	const {items: appointments, loading, error} = useSelector((state) => state.appointments);
	const token = localStorage.getItem('token');

	const fetchAppointments = async () => {
		dispatch(setLoading(true));
		try {
			const data = await getAppointments(token);
			// TODO alert here
			dispatch(setAppointments(data.data));
		} catch (err) {
			dispatch(setError(err.message));
		} finally {
			dispatch(setLoading(false));
		}
	};

	useEffect(() => {
		if (token) {
			fetchAppointments();
		}
	}, [token]);

	const handleDelete = async (appointmentId) => {
		dispatch(setLoading(true));
		try {
			await deleteApiAppointment(token, appointmentId);
			fetchAppointments();
			// dispatch(deleteAppointment(appointmentId));
		} catch (err) {
			dispatch(setError(err.message));
		} finally {
			dispatch(setLoading(false));
		}
	};

    const handleEdit = (appointment) => {
      navigate('/edit-appointment', {state: appointment})
    }

	return (
		<div>
			<h2>User Dashboard</h2>
			{loading && <CircularProgress/>}
			{error && <div>{error}</div>}
			<Grid container spacing={3}>
				{appointments.map((appointment, i) => (
					<Grid item xs={12} sm={6} md={4} key={i}>
						<Card>
							<CardContent>
								<Typography variant="h6">{appointment.doctor.name}</Typography>
								<Typography>{appointment.date}</Typography>
								<Typography>{appointment.time}</Typography>
								<Button onClick={() => handleEdit(appointment)}>Edit</Button>
								<Button onClick={() => handleDelete(appointment._id)}>Delete</Button>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default UserDashboard;
