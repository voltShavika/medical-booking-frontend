import React, {useEffect, useState} from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Chip,
	Typography,
	Box, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
	console.log("Doctors", doctors)
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

	const renderPills = (dates) => {
		return dates.map((date, index) => (
			<Chip
				key={index}
				label={date}
				sx={{
					margin: '4px',
					backgroundColor: '#2196F3',
					color: 'white',
				}}
			/>
		));
	};

	return (
		<Paper sx={{padding: '20px', width: '100%'}}>
			<Typography variant="h5" align="center" sx={{marginBottom: '20px'}}>
				Doctors List
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{minWidth: 650}} aria-label="doctors table">
					<TableHead>
						<TableRow>
							<TableCell><strong>Doctor Name</strong></TableCell>
							<TableCell align="center"><strong>Speciality</strong></TableCell>
							<TableCell align="center"><strong>Days</strong></TableCell>
							<TableCell align="center"><strong>Availability(7 Days)</strong></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{doctors.map((doctor, index) => (
							<TableRow key={doctor._id}>
								<TableCell component="th" scope="row">{doctor.name}</TableCell>
								<TableCell align="center">{doctor.speciality}</TableCell>
								<TableCell align="center">
									{renderPills(doctor.availableDays)}
								</TableCell>
								<TableCell align="center">
									<Box sx={{width: '100%', maxWidth: '600px', margin: 'auto'}}>
										{doctor.availableSlots.map((slot, i) => (
											<>
												{
													slot.slots.length > 0 &&

													<Accordion key={i}>
														<AccordionSummary expandIcon={<ExpandMoreIcon/>}
																		  aria-controls={`panel-${slot.date}-content`}
																		  id={`panel-${slot.date}-header`}>
															<Typography>{slot.date} - {slot.day}</Typography>
														</AccordionSummary>
														<AccordionDetails>
															<Box sx={{display: 'flex', flexWrap: 'wrap'}}>
																{slot.slots.map((pill, j) => (
																	<Chip
																		key={j}
																		label={pill}
																		sx={{
																			margin: '4px',
																			backgroundColor: index % 2 === 0 ? '#FF6F61' : '#2196F3', // Alternating colors
																			color: 'white',
																		}}
																	/>
																))}
															</Box>
														</AccordionDetails>
													</Accordion>
												}
											</>
										))}
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default DoctorListPage;
