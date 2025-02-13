import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser as loginUserAction, setError } from '../../redux/userSlice';
import { loginUser } from '../../api';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      if(response.status){
        dispatch(loginUserAction(response));
        navigate('/dashboard')
      }
      else{
          console.log(response.message);
      }

    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
