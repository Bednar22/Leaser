import React, { useState } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GridBreak } from '../utilities/gridBreak';
import { PhoneNumberConfiramtion } from './phoneNumberConfirmation';
import axios from 'axios';

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const passwordCheck = () => {
        if (password !== passwordConfirm && passwordConfirm !== '') {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const validateEmail = (email) => {
        if (email) {
            const error = String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            setEmailError(!error);
        } else {
            setEmailError(false);
        }
    };

    const onSubmit = (e) => {
        const user = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        };

        axios
            .post('/api/signup', { user })
            .then((res) => {
                navigate('/login');
            })
            .catch((err) => {
                console.log('Errors');
            });

        e.preventDefault();
    };

    return (
        <>
            <Container maxWidth='md'>
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Box>
                        <Grid container alignItems='center' justifyContent='center' spacing={{ xs: 2, md: 3 }}>
                            <GridBreak />
                            <Grid item sm={12} md={4}>
                                <Typography variant='h5'>Welcome to Leaser!</Typography>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    error={emailError}
                                    required
                                    label='E-mail adress'
                                    size='small'
                                    type='email'
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={(e) => validateEmail(e.target.value)}
                                    {...(emailError ? { helperText: "It's not valid e-mail adress" } : {})}
                                ></TextField>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label='Password'
                                    type='password'
                                    size='small'
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></TextField>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label='Confirm password'
                                    type='password'
                                    size='small'
                                    fullWidth
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    error={passwordError}
                                    onBlur={passwordCheck}
                                    {...(passwordError ? { helperText: "Passwords don't match" } : {})}
                                ></TextField>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <Stack direction='row' spacing={2}>
                                    <TextField
                                        required
                                        label='First name'
                                        size='small'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    ></TextField>
                                    <TextField
                                        required
                                        label='Last name'
                                        size='small'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    ></TextField>
                                </Stack>
                            </Grid>
                            <GridBreak />

                            <Grid item xs={8} md={4}>
                                <Button variant='contained' sx={{ width: 1 / 1 }} onClick={(e) => onSubmit(e)}>
                                    Join Leaser
                                </Button>
                            </Grid>
                            <GridBreak />
                        </Grid>
                    </Box>
                </Paper>
            </Container>

            <h1>TEGO TU PÓŻNIEJ NIE BEDZIE --- to będzie jakiś popup czy coś takiego</h1>
            <Container maxWidth='sm' sx={{ my: 5 }}>
                <PhoneNumberConfiramtion></PhoneNumberConfiramtion>
            </Container>
        </>
    );
};
