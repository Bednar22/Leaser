import React, { useState } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { GridBreak } from '../utilities/gridBreak';
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Test button click');
    };

    return (
        <>
            <Container maxWidth='xs'>
                <Paper sx={{ p: 4 }}>
                    <Grid container direction='row' justifyContent='center' alignItems='center' spacing={4}>
                        <GridBreak />
                        <Grid item sm={10} md={8}>
                            <TextField label='E-mail adress' onChange={(e) => setUsername(e.target.value)}></TextField>
                        </Grid>
                        <GridBreak />
                        <GridBreak />
                        <Grid item sm={8} md={8}>
                            <TextField
                                label='Password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            ></TextField>
                        </Grid>
                        <GridBreak />

                        <GridBreak />
                        <Grid item sm={8} md={10}>
                            <Typography variant='p'>
                                Don't have an account? <Link to='/signup'> Join Leaser!</Link>
                            </Typography>
                        </Grid>
                        <GridBreak />
                        <Grid item sm={8} md={8}>
                            <Button onClick={handleLogin} variant='contained' sx={{ width: 1 / 1 }}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};
