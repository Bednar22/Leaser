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
        .min(8, 'Password must be at least 8 characters')
        .max(40, 'Password must not exceed 40 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must contain one Uppercase, one Lowercase, one number and one special case character'
        ),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords do not match'),
    firstName: yup.string().required('First name is required'),
    surname: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    address: yup.object().shape({
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required'),
        street: yup.string().required('Street is required'),
        postal_code: yup.string().required('Postal code is required'),
        building_no: yup.string().required('Building is required'),
    }),
});

export const SignUp = (props) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        const test = {
            nickName: 'pies',
            name: 'pies',
            surname: 'pies',
            email: 'user2222@gmail.com',
            password: 'Qwer1234!',
            phoneNumber: '123456789',
        };

        console.log(data);
        // axios
        //     .post('/api/Accounts/Register', test)
        //     .then((res) => {
        //         console.log(res.data);
        //         // navigate('/login');
        //     })
        //     .catch((err) => {
        //         setError(err.response.data);
        //         console.log(err.response.data);
        //     });
    };

    return (
        <>
            {console.log(errors)}
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
                                            {...register('surname')}
                                            error={errors.surname ? true : false}
                                            helperText={errors.surname ? errors.surname.message : null}
                                        ></TextField>
                                    </Stack>
                                </Grid>
                                <GridBreak />

                                <GridBreak />
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        label='Username'
                                        size='small'
                                        fullWidth
                                        {...register('username')}
                                        error={errors.username ? true : false}
                                        helperText={errors.username ? errors.username.message : null}
                                    ></TextField>
                                </Grid>
                                <GridBreak />
                                <GridBreak />
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        label='Phone number'
                                        size='small'
                                        fullWidth
                                        {...register('phoneNumber')}
                                        error={errors.phoneNumber ? true : false}
                                        helperText={errors.phoneNumber ? errors.phoneNumber.message : null}
                                    ></TextField>
                                </Grid>
                                <GridBreak />

                                <GridBreak />
                                <Grid item xs={12} md={6}>
                                    <Stack direction='row' spacing={2}>
                                        <TextField
                                            required
                                            label='Country'
                                            size='small'
                                            {...register('address.country')}
                                            error={errors.address && errors.address.country ? true : false}
                                            helperText={
                                                errors.address && errors.address.country
                                                    ? errors.address.country.message
                                                    : null
                                            }
                                        ></TextField>
                                        <TextField
                                            required
                                            label='Postal code'
                                            size='small'
                                            {...register('address.postal_code')}
                                            error={errors.address && errors.address.postal_code ? true : false}
                                            helperText={
                                                errors.address && errors.address.postal_code
                                                    ? errors.address.postal_code.message
                                                    : null
                                            }
                                        ></TextField>
                                    </Stack>
                                </Grid>
                                <GridBreak />
                                <GridBreak />
                                <Grid item xs={12} md={6}>
                                    <Stack direction='row' spacing={2}>
                                        <TextField
                                            required
                                            label='City'
                                            size='small'
                                            {...register('address.city')}
                                            error={errors.address && errors.address.city ? true : false}
                                            helperText={
                                                errors.address && errors.address.city
                                                    ? errors.address.city.message
                                                    : null
                                            }
                                        ></TextField>
                                        <TextField
                                            required
                                            label='Street'
                                            size='small'
                                            {...register('address.street')}
                                            error={errors.address && errors.address.street ? true : false}
                                            helperText={
                                                errors.address && errors.adreess.street
                                                    ? errors.address.street.message
                                                    : null
                                            }
                                        ></TextField>
                                    </Stack>
                                </Grid>
                                <GridBreak />
                                <GridBreak />
                                <Grid item xs={12} md={6}>
                                    <Stack direction='row' spacing={2}>
                                        <TextField
                                            required
                                            label='Building number'
                                            size='small'
                                            {...register('address.building_no')}
                                            error={errors.address && errors.address.building_no ? true : false}
                                            helperText={
                                                errors.address && errors.address.building_no
                                                    ? errors.address.building_no.message
                                                    : null
                                            }
                                        ></TextField>
                                        <TextField
                                            label='Apartment number'
                                            size='small'
                                            {...register('address.apartment_no')}
                                        ></TextField>
                                    </Stack>
                                </Grid>
                                <GridBreak />
                                {error ? (
                                    <Grid item xs={10} md={10}>
                                        <Typography color='error' variant='subtitle2' align='center'>
                                            {error}
                                        </Typography>
                                    </Grid>
                                ) : null}
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
        </>
    );
};
