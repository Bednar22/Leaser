import React, { useState, useEffect } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GridBreak } from '../utilities/gridBreak';
import axios from 'axios';
import { useAuth } from '../utilities/auth';

export const UserSettings = (props) => {
    const auth = useAuth();
    const [error, setError] = useState('');
    const [editPhase, setEditPhase] = useState(false);
    const [readOnlyProp, setReadOnlyProp] = useState(true);
    const [email, setEmail] = useState(auth.user.email);
    const [nickName, setNickName] = useState(auth.user.nickName);
    const [name, setName] = useState(auth.user.name);
    const [surname, setSurname] = useState(auth.user.surname);
    const [phoneNumber, setPhoneNumber] = useState(auth.user.phoneNumber);
    const [buildingNo, setBuildingNo] = useState('');
    const [apartmentNo, setApartmentNo] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [password, setPassword] = useState('');
    const [addressId, setAddressId] = useState('');

    const getAddressData = () => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get('/api/Addresses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setCity(res.data.city);
                setCountry(res.data.country);
                setStreet(res.data.street);
                setBuildingNo(res.data.buildingNo);
                setApartmentNo(res.data.apartmentNo);
                setPostalCode(res.data.postalCode);
                setAddressId(res.data.id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = (e) => {
        setEditPhase(false);
        const userData = {
            surname,
            name,
            nickName,
            oldPassword: password,
            newPassword: password,
        };

        const addressData = {
            city,
            country,
            street,
            postalCode,
            apartmentNo,
            buildingNo,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
            },
        };

        // axios
        //     .put(`/api/Accounts/${auth.user.id}`, userData, config)
        //     .then((res) => {
        //         console.log('Bez problemów');
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setError(err.response.data);
        //     });

        axios
            .put(`/api/Addresses/${addressId}`, addressData, config)
            .then((res) => {
                console.log('Bez problemów');
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data);
            });
        // getAddressData();
        e.preventDefault();
    };

    useEffect(() => {
        getAddressData();
    }, []);

    return (
        <>
            <Container maxWidth='md'>
                <Paper sx={{ p: 3, mb: 4 }}>
                    {/* <form onSubmit={() => onSubmit()}> */}
                    <Box>
                        <Grid container alignItems='center' justifyContent='center' spacing={{ xs: 2, md: 3 }}>
                            <Grid item xs={10} md={10}>
                                <Typography align='center' variant='h6'>
                                    Data
                                </Typography>
                            </Grid>

                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    value={email}
                                    required
                                    label='E-mail adress'
                                    size='small'
                                    type='email'
                                    fullWidth
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        InputProps={{
                                            readOnly: readOnlyProp,
                                        }}
                                        required
                                        label='First name'
                                        size='small'
                                    ></TextField>
                                    <TextField
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        InputProps={{
                                            readOnly: readOnlyProp,
                                        }}
                                        required
                                        label='Last name'
                                        size='small'
                                    ></TextField>
                                </Stack>
                            </Grid>
                            <GridBreak />

                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    value={nickName}
                                    onChange={(e) => setNickName(e.target.value)}
                                    InputProps={{
                                        readOnly: readOnlyProp,
                                    }}
                                    required
                                    label='Nickname'
                                    size='small'
                                    fullWidth
                                ></TextField>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    value={phoneNumber}
                                    required
                                    label='Phone number'
                                    size='small'
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                ></TextField>
                            </Grid>
                            <GridBreak />

                            <Grid item xs={10} md={10}>
                                <Typography align='center' variant='h6'>
                                    Address
                                </Typography>
                            </Grid>

                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <Stack direction='row' spacing={2}>
                                    <TextField
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        InputProps={{
                                            readOnly: readOnlyProp,
                                        }}
                                        required
                                        label='Country'
                                        size='small'
                                    ></TextField>
                                    <TextField
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        InputProps={{
                                            readOnly: readOnlyProp,
                                        }}
                                        required
                                        label='Postal code'
                                        size='small'
                                    ></TextField>
                                </Stack>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <Stack direction='row' spacing={2}>
                                    <TextField
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        InputProps={{
                                            readOnly: readOnlyProp,
                                        }}
                                        required
                                        label='City'
                                        size='small'
                                    ></TextField>
                                    <TextField
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        InputProps={{
                                            readOnly: readOnlyProp,
                                        }}
                                        required
                                        label='Street'
                                        size='small'
                                    ></TextField>
                                </Stack>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <Stack direction='row' spacing={2}>
                                    <TextField
                                        value={buildingNo}
                                        onChange={(e) => setBuildingNo(e.target.value)}
                                        InputProps={{
                                            readOnly: readOnlyProp,
                                        }}
                                        required
                                        label='Building number'
                                        size='small'
                                    ></TextField>
                                    <TextField
                                        value={apartmentNo}
                                        onChange={(e) => setApartmentNo(e.target.value)}
                                        InputProps={{
                                            readOnly: readOnlyProp,
                                        }}
                                        label='Apartment number'
                                        size='small'
                                    ></TextField>
                                </Stack>
                            </Grid>
                            <GridBreak />
                            {/* Later it will be a dialog ?? */}
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        readOnly: readOnlyProp,
                                    }}
                                    required
                                    label='Confirm password'
                                    size='small'
                                    fullWidth
                                ></TextField>
                            </Grid>
                            <GridBreak />

                            {error ? (
                                <Grid item xs={10} md={10}>
                                    <Typography color='error' variant='subtitle2' align='center'>
                                        {error}
                                    </Typography>
                                </Grid>
                            ) : null}

                            {editPhase ? (
                                <>
                                    <GridBreak />
                                    <Grid item xs={8} md={4}>
                                        <Button
                                            variant='contained'
                                            sx={{ width: 1 / 1 }}
                                            onClick={(e) => {
                                                onSubmit(e);
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                    <GridBreak />
                                </>
                            ) : (
                                <>
                                    <GridBreak />
                                    <Grid item xs={8} md={4}>
                                        <Button
                                            variant='contained'
                                            sx={{ width: 1 / 1 }}
                                            onClick={() => {
                                                setEditPhase(true);
                                                setReadOnlyProp(false);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Grid>
                                    <GridBreak />
                                </>
                            )}
                        </Grid>
                    </Box>
                    {/* </form> */}
                </Paper>
            </Container>
        </>
    );
};
