import React, {useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Navbar from './components/Common/Navbar.jsx';
import LoginPage from './components/Auth/LoginPage.jsx';
import RegisterPage from './components/Auth/RegisterPage.jsx';
import UserDashboard from './components/Dashboard/UserDashboard.jsx';
import AppointmentBookingPage from './components/Appointment/AppointmentBookingPage.jsx';
import PrivateRoute from './components/Common/PrivateRoute.jsx';
import AppointmentEditPage from "./components/Appointment/AppointmentEditPage.jsx";
import DoctorListPage from "./components/Doctor/DoctorListPage.jsx";
import {Alert, Box, Button, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeAlert, showAlert} from "./redux/alertSlice.js";

const App = () => {
	const dispatch = useDispatch();
	const { open, severity, message } = useSelector((state) => state.alert);

	const handleClick = () => {
		dispatch(showAlert({message: 'This is snackbar', severity: 'error'}))
	}
	const handleClose = () => {
		dispatch(closeAlert())
	};
	return (
		<Router>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				width: "100vw",
				height: '100vh'
			}}> {/* Parent using Flexbox */}
				<Navbar/>
				{/*<Button onClick={handleClick} >Show Alert</Button>*/}
				<Box component="main" sx={{flexGrow: 1}}> {/* Main content takes up remaining space */}
					<Routes>
						<Route exact path="/" element={<LoginPage/>}/>
						<Route exact path="/register" element={<RegisterPage/>}/>
						{/*<Route exact path="/dashboard" element={<UserDashboard/>}/>*/}
						{/*<Route exact path="/doctors" element={<DoctorListPage/>}/>*/}
						{/*<Route exact path="/book-appointment" element={<AppointmentBookingPage/>}/>*/}
						{/*<Route exact path="/edit-appointment" element={<AppointmentEditPage/>}/>*/}
						<Route exact path="/doctors" element={<PrivateRoute element={<DoctorListPage/>}/>}/>
						<Route exact path="/dashboard" element={<PrivateRoute element={<UserDashboard/>}/>}/>
						<Route exact path="/book-appointment"
							   element={<PrivateRoute element={<AppointmentBookingPage/>}/>}/>
						<Route exact path="/edit-appointment"
							   element={<PrivateRoute element={<AppointmentEditPage/>}/>}/>
						<Route path="*" element={<Navigate to={"/dashboard"}/>}/>
						{/*<PrivateRoute exact path="/book-appointment" element={AppointmentBookingPage} />*/}
					</Routes>
				</Box>
				<Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
				>
					<Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
						{message}
					</Alert>
				</Snackbar>
			</Box>
		</Router>
	);
};

export default App;
