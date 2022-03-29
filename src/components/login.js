import React, { useState } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Test button click');
    };

    return (
        <>
            <Container sx={{ width: 1 / 2 }}>
                <Paper sx={{ p: 4 }}>
                    <Grid container direction='column' justifyContent='center' alignItems='center' spacing={4}>
                        <Grid item sm={8} md={4}>
                            <TextField label='Nazwa' onChange={(e) => setUsername(e.target.value)}></TextField>
                        </Grid>
                        <Grid item sm={8} md={4}>
                            <TextField
                                label='Hasło'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            ></TextField>
                        </Grid>
                        <Grid item sm={8} md={4}>
                            <Typography variant='p'>
                                Nie masz konta? Zarejestruj się <Link to='/rejestracja'>tutaj</Link>
                            </Typography>
                        </Grid>
                        <Grid item sm={8} md={4}>
                            <Button onClick={handleLogin} variant='contained'>
                                Zaloguj
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};
