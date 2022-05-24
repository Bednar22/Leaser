import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import './../../App.css';
import Box from '@mui/material/Box';
import { LoggedProfile } from './loggedProfile';
import { NotLoggedProfile } from './notLoggedProfile';
import { useAuth } from '../utilities/auth';

export const Navbar = (props) => {
    const auth = useAuth();

    return (
        <>
            <Box className='menu' sx={{ mb: 8 }}>
                <Link className='menu-button' to='/'>
                    LOGO
                </Link>
                <Stack direction='row'>
                    <NavLink className='menu-button' to='home'>
                        Home
                    </NavLink>
                    <NavLink className='menu-button' to='/offers'>
                        Offers
                    </NavLink>
                    <NavLink className='menu-button' to='/addoffer'>
                        Add offer
                    </NavLink>

                    {auth.user ? <LoggedProfile /> : <NotLoggedProfile />}
                </Stack>
            </Box>
        </>
    );
};
