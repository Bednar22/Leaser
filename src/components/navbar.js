import React from 'react';
import { Stack } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import './../App.css';
import Box from '@mui/material/Box';
import { LoggedProfile } from './loggedProfile';

export const Navbar = (props) => {
    return (
        <>
            <Box className='menu' sx={{ mb: 8 }}>
                <Link className='menu-button' to='/'>
                    LOGO
                </Link>
                <Stack direction='row'>
                    <NavLink className='menu-button' to='/'>
                        Home
                    </NavLink>
                    <NavLink className='menu-button' to='login'>
                        Login
                    </NavLink>
                    <NavLink className='menu-button' to='signup'>
                        Sign Up
                    </NavLink>
                    <LoggedProfile />
                </Stack>
            </Box>
        </>
    );
};
