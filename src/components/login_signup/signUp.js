import React, { useState } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GridBreak } from '../utilities/gridBreak';
import { PhoneNumberConfiramtion } from './phoneNumberConfirmation';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords does not match'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    // acceptTerms: yup.bool().oneOf([true], 'Accept Terms is required'),
});

export const SignUp = (props) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        axios
            .post('/api/signup', data)
            .then((res) => {
                navigate('/login');
            })
            .catch((err) => {
                setError('Something went wrong, try again');
                console.log('Errors');
            });
    };

    return (
        <>
            <Container maxWidth='md'>
                <Paper sx={{ p: 3, mb: 4 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                        required
                                        label='E-mail adress'
                                        size='small'
                                        type='email'
                                        fullWidth
                                        {...register('email')}
                                        error={errors.email ? true : false}
                                        helperText={errors.email ? errors.email.message : null}
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
                                        {...register('password')}
                                        error={errors.password ? true : false}
                                        helperText={errors.password ? errors.password.message : null}
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
                                        {...register('confirmPassword')}
                                        error={errors.confirmPassword ? true : false}
                                        helperText={errors.confirmPassword?.message}
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
                                            {...register('firstName')}
                                            error={errors.firstName ? true : false}
                                            helperText={errors.firstName ? errors.firstName.message : null}
                                        ></TextField>
                                        <TextField
                                            required
                                            label='Last name'
                                            size='small'
                                            {...register('lastName')}
                                            error={errors.lastName ? true : false}
                                            helperText={errors.lastName ? errors.lastName.message : null}
                                        ></TextField>
                                    </Stack>
                                </Grid>
                                <GridBreak />

                                <Grid item xs={8} md={4}>
                                    <Button variant='contained' sx={{ width: 1 / 1 }} type='submit'>
                                        Join Leaser
                                    </Button>
                                </Grid>
                                <GridBreak />
                            </Grid>
                        </Box>
                    </form>
                </Paper>
            </Container>

            <h1>TEGO TU PÓŻNIEJ NIE BEDZIE --- to będzie jakiś popup czy coś takiego</h1>
            <Container maxWidth='sm' sx={{ my: 5 }}>
                <PhoneNumberConfiramtion></PhoneNumberConfiramtion>
            </Container>
        </>
    );
};
