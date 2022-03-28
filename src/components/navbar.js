import React from 'react';
import { AppBar, Toolbar, Stack, Typography, Link as MaterialLink } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = (props) => {
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Stack direction='row' spacing={2}>
                        <Link to='/'>
                            <Typography color='white'>HOME</Typography>
                        </Link>
                        <Link to='login'>
                            <Typography color='white'>LOGIN</Typography>
                        </Link>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
};
