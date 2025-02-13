import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Common/Navbar.jsx';
import LoginPage from './components/Auth/LoginPage.jsx';
import RegisterPage from './components/Auth/RegisterPage.jsx';
import UserDashboard from './components/Dashboard/UserDashboard.jsx';
import AppointmentBookingPage from './components/Appointment/AppointmentBookingPage.jsx';
import PrivateRoute from './components/Common/PrivateRoute.jsx';
import AppointmentEditPage from "./components/Appointment/AppointmentEditPage.jsx";
import DoctorListPage from "./components/Doctor/DoctorListPage.jsx";
import {Box} from "@mui/material";

const App = () => {
	return (
		<Router>
			<Box sx={{ display: 'flex', flexDirection: 'column', width: "100vw", height: '100vh' }}> {/* Parent using Flexbox */}
              <Navbar/>
              <Box component="main" sx={{ flexGrow: 1 }}> {/* Main content takes up remaining space */}
                <Routes>
				<Route exact path="/login" element={<LoginPage/>}/>
				<Route exact path="/register" element={<RegisterPage/>}/>
				<Route exact path="/dashboard" element={<UserDashboard/>}/>
				<Route exact path="/doctors" element={<DoctorListPage/>}/>
				<Route exact path="/book-appointment" element={<AppointmentBookingPage/>}/>
				<Route exact path="/edit-appointment" element={<AppointmentEditPage/>}/>

				{/*<PrivateRoute exact path="/dashboard" component={UserDashboard} />*/}
				{/*<PrivateRoute exact path="/book-appointment" component={AppointmentBookingPage} />*/}
			</Routes>
              </Box>
            </Box>


		</Router>
	);
};

export default App;
