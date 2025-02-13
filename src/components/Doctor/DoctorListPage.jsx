import React, {useEffect, useState} from 'react';
import {Container, Grid, Card, CardContent, Typography} from '@mui/material';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setError, setLoading} from "../../redux/appointmentSlice.js";
import {getDoctors} from "../../api.js";
import {setDoctors} from "../../redux/doctorSlice.js";

const DoctorListPage = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const {doctors: doctors} = useSelector((state) => state.doctors);

    const token = localStorage.getItem('token');

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

	return (
		<Container>
			<h2>Available Doctors</h2>
			<Grid container spacing={2}>
				{doctors.map((doctor, i) => (
					<Grid item xs={12} sm={6} md={4} key={i}>
						<Card>
							<CardContent>
								<Typography variant="h6">{doctor.name}</Typography>
								<Typography>{doctor.speciality}</Typography>
								{/*<Typography>{doctor.availability}</Typography>*/}
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default DoctorListPage;
