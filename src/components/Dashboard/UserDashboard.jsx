import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAppointments, deleteAppointment, setLoading, setError} from '../../redux/appointmentSlice';
import {getAppointments, deleteAppointment as deleteApiAppointment} from '../../api';
import {Button, CircularProgress, Grid, Card, CardContent, Typography, Divider} from '@mui/material';
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
		<div style={{padding: '20px'}}>
			<h2 style={{textAlign: 'center', marginBottom: '20px'}}>User Dashboard</h2>


			<h3 style={{textAlign: 'center', marginBottom: '20px'}}>Upcoming Appointments</h3>
			<Divider style={{marginBottom: "10px"}}/>
			{loading && <CircularProgress style={{display: 'block', margin: '0 auto'}}/>}
			{error && <div style={{color: 'red', textAlign: 'center', marginBottom: '20px'}}>{error}</div>}

			<Grid container spacing={3}>
				{!loading && appointments.length === 0 && <Typography variant="h6" style={{textAlign: 'center', width: '100%', marginTop: "20px"}}>No appointments found</Typography>}
				{appointments.map((appointment, i) => (
					<Grid item xs={12} sm={6} md={4} key={i}>
						<Card style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
							<CardContent>
								<Typography variant="h6" style={{marginBottom: '10px', fontWeight: 'bold'}}>
									{appointment.doctor.name}
								</Typography>
								<Typography style={{marginBottom: '10px'}}>
									<strong>Date:</strong> {appointment.date}
								</Typography>
								<Typography style={{marginBottom: '10px'}}>
									<strong>Time:</strong> {appointment.time}
								</Typography>
								<div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
									<Button
										variant="contained"
										color="primary"
										size="small"
										onClick={() => handleEdit(appointment)}
									>
										Edit
									</Button>
									<Button
										variant="outlined"
										color="error"
										size="small"
										onClick={() => handleDelete(appointment._id)}
									>
										Delete
									</Button>
								</div>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default UserDashboard;
