import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Button} from '@mui/material';

const Navbar = () => {
	const token = localStorage.getItem('token');
	return (
		<AppBar position="static">
			<Toolbar>

				<Link to="/register" style={{color: 'white', textDecoration: 'none'}}>
					<Button color="inherit">Register</Button>
				</Link>
				{
					!token && <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
						<Button color="inherit">Login</Button>
					</Link>
				}
				{
					token && <Link to="/dashboard" style={{color: 'white', textDecoration: 'none'}}>
						<Button color="inherit">Dashboard</Button>
					</Link>
				}
				{
					token && <Link to="/book-appointment" style={{color: 'white', textDecoration: 'none'}}>
						<Button color="inherit">Book</Button>
					</Link>
				}
				{
					token && <Link to="/doctors" style={{color: 'white', textDecoration: 'none'}}>
						<Button color="inherit">Doctors</Button>
					</Link>
				}

			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
