import React, { useState } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { GridBreak } from '../utilities/gridBreak';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const Login = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
        console.log(data);

        axios
            .post('/api/login', data)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                setError(true);
            });
    };

    return (
        <>
            <Container maxWidth='xs'>
                <Paper sx={{ p: 4 }}>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <Grid container direction='row' justifyContent='center' spacing={4}>
                            <GridBreak />
                            <Grid item xs={10} md={10}>
                                <TextField
                                    fullWidth
                                    label='E-mail adress'
                                    type='email'
                                    {...register('email', {
                                        required: 'Email required',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Invalid email adress',
                                        },
                                    })}
                                    error={errors.email ? true : false}
                                    helperText={errors.email ? errors.email.message : null}
                                    onFocus={() => setError(false)}
                                ></TextField>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={10} md={10}>
                                <TextField
                                    fullWidth
                                    label='Password'
                                    type='password'
                                    onFocus={() => setError(false)}
                                    {...register('password', {
                                        required: 'Password required',
                                    })}
                                    error={errors.password ? true : false}
                                ></TextField>
                            </Grid>
                            <GridBreak />

                            <Grid item xs={8} md={8} sx={{ mt: -3, mb: -1 }}>
                                <Typography variant='subtitle2' color='error' align='center'>
                                    {error ? 'Wrong e-mail or password' : null}
                                </Typography>
                            </Grid>

                            <GridBreak />
                            {
                                <Grid item sm={8} md={10}>
                                    <Typography variant='p'>
                                        Don't have an account? <Link to='/signup'> Join Leaser!</Link>
                                    </Typography>
                                </Grid>
                            }
                            <GridBreak />
                            <Grid item sm={8} md={8}>
                                <Button
                                    // onClick={handleSubmit(handleLogin)}
                                    variant='contained'
                                    sx={{ width: 1 / 1 }}
                                    type='submit'
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    );
};
