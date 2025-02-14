import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import bcrypt from 'bcryptjs';
import {registerUser} from '../../api';
import {loginUser as loginUserAction} from '../../redux/userSlice';
import {Box, Card, CardContent, TextField, Button, Typography, Paper} from '@mui/material';

import {useNavigate} from 'react-router-dom';
import {showAlert} from "../../redux/alertSlice.js";

const RegisterPage = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async () => {
		try {
			const hashedPassword = bcrypt.hashSync(password, 10);
			const response = await registerUser({email, username, password: hashedPassword});
			if (response.status) {
				dispatch(loginUserAction(response));
				dispatch(showAlert({message: response.message || "Register Successful", severity: 'success'}))
				navigate('/dashboard')
			} else {
				dispatch(showAlert({message: response.message || "Something went wrong", severity: 'error'}))
			}
		} catch (error) {
			dispatch(showAlert({message: error.message || "Something went wrong", severity: 'error'}))
		}
	};

	return (

		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{minHeight: '100vh', backgroundColor: '#f4f6f8'}}
		>
			<Card>
				<CardContent>
					<Typography variant="h5" align="center" sx={{marginBottom: '20px'}}>
						Register
					</Typography>

					{/* Email Input */}
					<TextField
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						fullWidth
						variant="outlined"
						sx={{marginBottom: '20px'}}
					/>

					{/* Username Input */}
					<TextField
						label="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						fullWidth
						variant="outlined"
						sx={{marginBottom: '20px'}}
					/>

					{/* Password Input */}
					<TextField
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						fullWidth
						variant="outlined"
						sx={{marginBottom: '20px'}}
					/>

					{/* Register Button */}
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleRegister}
						sx={{padding: '10px', marginTop: '20px'}}
					>
						Register
					</Button>
				</CardContent>
			</Card>
		</Box>
	);
};

export default RegisterPage;
