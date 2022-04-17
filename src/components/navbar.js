import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import './../App.css';
import Box from '@mui/material/Box';
import { LoggedProfile } from './loggedProfile';
import { NotLoggedProfile } from './notLoggedProfile';

export const Navbar = (props) => {
    const [logged, setLogged] = useState();

    useEffect(() => {
        if (window.localStorage.getItem('leaserToken')) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, []);

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
                    <NavLink className='menu-button' to='/offers'>
                        Offers
                    </NavLink>
                    {/* <NavLink className='menu-button' to='login'>
                        Login
                    </NavLink>
                    <NavLink className='menu-button' to='signup'>
                        Sign Up
                    </NavLink> */}
                    {logged == true ? <LoggedProfile /> : <NotLoggedProfile />}
                </Stack>
            </Box>
        </>
    );
};
