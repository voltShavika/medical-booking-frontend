import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser as loginUserAction, setError} from '../../redux/userSlice';
import {loginUser} from '../../api';
import {Box, Card, CardContent, TextField, Button, Typography, Grid, Paper} from '@mui/material';

import {useNavigate} from 'react-router-dom';
import {showAlert} from "../../redux/alertSlice.js";


const LoginPage = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			const response = await loginUser({email, password});
			if (response.status) {
				dispatch(loginUserAction(response));
				dispatch(showAlert({message: response.message || "Login Successful", severity: 'success'}))
				navigate('/dashboard')
			} else {
				dispatch(showAlert({message: response.message, severity: 'error'}))
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
                        Login
                    </Typography>

                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{marginBottom: '20px'}}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{marginBottom: '20px'}}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        sx={{padding: '10px', marginTop: '20px'}}
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>
		</Box>
	);
};

export default LoginPage;
