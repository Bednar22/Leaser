import React from 'react';
import { Stack, Box } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import './../App.css';
export const Navbar = (props) => {
    return (
        <>
            <Box className='menu' sx={{ mb: 8 }}>
                <Link className='menu-button' to='/'>
                    TUTAJ LOGO
                </Link>
                <Stack direction='row'>
                    <NavLink className='menu-button' to='/'>
                        Home
                    </NavLink>
                    <NavLink className='menu-button' to='login'>
                        Login
                    </NavLink>
                    <NavLink className='menu-button' to='rejestracja'>
                        Rejestracja
                    </NavLink>
                </Stack>
            </Box>
        </>
    );
};
