import React, { useState, useEffect } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GridBreak } from '../utilities/gridBreak';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../login_signup/signUp';
import { useAuth } from '../utilities/auth';

export const UserSettings = (props) => {
    const auth = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: 'Pies',
        },
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
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
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        label='E-mail adress'
                                        size='small'
                                        type='email'
                                        fullWidth
                                        {...register('email')}
                                        InputProps={{
                                            readOnly: true,
                                        }}
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
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        {...register('phoneNumber')}
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
                                    <Button variant='contained' sx={{ width: 1 / 1 }} type='submit'>
                                        Save
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
