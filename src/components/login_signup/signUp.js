import React, { useState } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GridBreak } from '../utilities/gridBreak';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PhoneNumberConfiramtion } from './phoneNumberConfirmation';
export const validationSchema = yup.object().shape({
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
    name: yup.string().required('First name is required'),
    surname: yup.string().required('Last name is required'),
    nickName: yup.string().required('Username is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    requestAddressDto: yup.object().shape({
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required'),
        street: yup.string().required('Street is required'),
        postalCode: yup.string().required('Postal code is required'),
        buildingNo: yup.string().required('Building number is required'),
    }),
});

export const SignUp = (props) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = () => {
        const data = getValues();
        console.log(data);
        axios
            .post('/api/Accounts/Register', data)
            .then((res) => {
                navigate('/login');
            })
            .catch((err) => {
                setError(err.response.data);
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
                                <Grid item xs={12} md={4}>
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
                                            {...register('name')}
                                            error={errors.name ? true : false}
                                            helperText={errors.name ? errors.name.message : null}
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
                                        label='Nickname'
                                        size='small'
                                        fullWidth
                                        {...register('nickName')}
                                        error={errors.nickName ? true : false}
                                        helperText={errors.nickName ? errors.nickName.message : null}
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
                                            {...register('requestAddressDto.country')}
                                            error={
                                                errors.requestAddressDto && errors.requestAddressDto.country
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.requestAddressDto && errors.requestAddressDto.country
                                                    ? errors.requestAddressDto.country.message
                                                    : null
                                            }
                                        ></TextField>
                                        <TextField
                                            required
                                            label='Postal code'
                                            size='small'
                                            {...register('requestAddressDto.postalCode')}
                                            error={
                                                errors.requestAddressDto && errors.requestAddressDto.postalCode
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.requestAddressDto && errors.requestAddressDto.postalCode
                                                    ? errors.requestAddressDto.postalCode.message
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
                                            {...register('requestAddressDto.city')}
                                            error={
                                                errors.requestAddressDto && errors.requestAddressDto.city ? true : false
                                            }
                                            helperText={
                                                errors.requestAddressDto && errors.requestAddressDto.city
                                                    ? errors.requestAddressDto.city.message
                                                    : null
                                            }
                                        ></TextField>
                                        <TextField
                                            required
                                            label='Street'
                                            size='small'
                                            {...register('requestAddressDto.street')}
                                            error={
                                                errors.requestAddressDto && errors.requestAddressDto.street
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.requestAddressDto && errors.requestAddressDto.street
                                                    ? errors.requestAddressDto.street.message
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
                                            {...register('requestAddressDto.buildingNo')}
                                            error={
                                                errors.requestAddressDto && errors.requestAddressDto.buildingNo
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.requestAddressDto && errors.requestAddressDto.buildingNo
                                                    ? errors.requestAddressDto.buildingNo.message
                                                    : null
                                            }
                                        ></TextField>
                                        <TextField
                                            label='Apartment number'
                                            size='small'
                                            {...register('requestAddressDto.apartmentNo')}
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
                                    <Button
                                        variant='contained'
                                        sx={{ width: 1 / 1 }}
                                        onClick={handleSubmit(handleClickOpen)}
                                    >
                                        Join Leaser
                                    </Button>
                                </Grid>

                                <GridBreak />
                            </Grid>
                        </Box>

                        <PhoneNumberConfiramtion
                            open={open}
                            handleClose={handleClose}
                            confirmClick={onSubmit}
                        ></PhoneNumberConfiramtion>
                    </form>
                </Paper>
            </Container>
        </>
    );
};
