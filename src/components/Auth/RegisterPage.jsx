import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../api';
import {loginUser as loginUserAction} from '../../redux/userSlice';
import {Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const RegisterPage = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async () => {
		try {
			const response = await registerUser({email, username, password});
			if (response.status) {
				dispatch(loginUserAction(response));
				// history.push('/dashboard');
				navigate('/dashboard')
			} else {
				alert(response.message);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth/>
			<TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth/>
			<TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
					   fullWidth/>
			<Button onClick={handleRegister}>Register</Button>
		</div>
	);
};

export default RegisterPage;
