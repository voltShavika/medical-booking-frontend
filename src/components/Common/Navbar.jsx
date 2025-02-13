import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Login</Button>
        </Link>
        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Register</Button>
        </Link>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Dashboard</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
