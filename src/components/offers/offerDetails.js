import { Grid, Container, Paper, Typography, Stack, Button, Rating, Box, Skeleton } from '@mui/material';
import { GridBreak } from '../utilities/gridBreak';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { CalendarPicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { Booking } from './booking';

export const OfferDetails = ( {offerId} ) => {
    

    const [loaded, setLoaded] = useState(false);
    const [offerData, setOfferData] = useState(null);
    const [renterData, setRenterData] = useState(null);
    const [offerImage, setOfferImage] = useState(null);

    const [availableFrom, setAvailableFrom] = useState(null);
    const [availableTo, setAvailableTo] = useState(null);
    const [deposit, setDeposit] = useState(null);
    const [offerTitle, setOfferTitle] = useState(null);
    const [renterNickname, setRenterNickname] = useState(null);
    const [renterScore, setRenterScore] = useState(null);
    const [pricePerDay, setPricePerDay] = useState(null);
    const [pricePerWeek, setPricePerWeek] = useState(null);
    const [pricePerMonth, setPricePerMonth] = useState(null);
    const [offerCity, setOfferCity] = useState(null);
    const [offerDescription, setofferDescription] = useState(null);



    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
        },
    };

    useEffect(() => {

        const fetchData = async () => {
            await axios
                .get(`/api/Posts/${offerId}`, config)
                .then( async (res) => {
                    //console.log(res);
                    console.log(await res.data)
                    setOfferData(await res.data);
                    let data = await res.data
    
                    await axios
                        .get(`/api/Accounts/${data.userId}/User`, config)
                        .then( async (res) => {
                            console.log(await res.data);
                            setRenterData(await res.data);
                        })
                        .catch((error) => {
                            console.log(error)
                        });
    
                    await axios
                        .get(`/api/Posts/${offerId}/Image`, {responseType: 'blob', headers: {Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`}})
                        .then( async (res) => {
                            //console.log(res);
                            setOfferImage(URL.createObjectURL( await res.data ));
                        })
                        .catch((error) => {
                            console.log(error)
                        
                    });
    
                    if (offerData != null && offerImage != null && renterData != null) {
                        // setAvailableFrom(offerData.availableFrom);
                        // setAvailableTo(offerData.availableTo)
                        // setDeposit(offerData.depositId);
                        // setOfferTitle(offerData.title);
                        // setRenterNickname(renterData.name);
                        // setRenterScore(renterData.rate);
                        // setPricePerDay(offerData.pricePerDay);
                        // setPricePerWeek(offerData.pricePerWeek);
                        // setPricePerMonth(offerData.pricePerMonth);
                        // setOfferCity(renterData.city);
                        // setofferDescription();
                        setLoaded(true);
                    }

                })
                .catch((error) => {
                    console.log(error)
                });
        }

        fetchData();

    }, [])

    const dateDisableFunction = (date) => {
        if ( date < availableFrom || date > availableTo ) {
            return true;
        }
        else {
            return false;
        }
    }

    const DepositComponent = () => {
        let text;
        if (deposit != null) {
            text = `${deposit} points`
        }
        else {
            text = 'not required'
        }
        return (
            <Stack justifyContent='center' alignItems='center'>
                <Typography variant='h6' color='secondary' fontWeight='bold'>
                    Deposit
                </Typography>
                <Typography>
                    {text}
                </Typography>
            </Stack>
        )
    }
    
    return (
        <>
            <Container maxWidth='xl'>
                <Grid container justifyContent='center' alignContent='center' spacing={2}>
                    <Grid item xs={9} md={6} lg={5} height='350px'>
                        <img src={offerImage} alt={offerTitle} height='100%' width='100%' style={{objectFit: 'cover', borderRadius: '4px'}}/>
                    </Grid>
                    <Grid item xs={9} md={5} lg={4} height='350px'>
                        <Stack spacing={1} height='100%'>
                            <Paper style={{ flex: '0.5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Stack p={1} alignItems='center'>
                                    <Typography variant='h6'>
                                        {renterNickname}
                                    </Typography>
                                    <Rating readOnly precision={0.1} value={renterScore}/>
                                </Stack>
                            </Paper>
                            <Stack spacing={1} style={{ flex: '1' }}>
                                <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Stack direction='row' spacing={5} justifyContent='center' alignContent='center'>
                                        <Stack justifyContent='center' alignItems='center'>
                                            <Typography color='secondary' fontWeight='bold' variant='h6'>
                                                Day+
                                            </Typography>
                                            <Typography>
                                                {pricePerDay} points/day
                                            </Typography>
                                        </Stack>
                                        <Stack justifyContent='center' alignItems='center'>
                                            <Typography color='secondary' fontWeight='bold' variant='h6'>
                                                Week+
                                            </Typography>
                                            <Typography>
                                                {pricePerWeek} points/day
                                            </Typography>
                                        </Stack>
                                        <Stack justifyContent='center' alignItems='center'>
                                            <Typography color='secondary' fontWeight='bold' variant='h6'>
                                                Month+
                                            </Typography>
                                            <Typography>
                                                {pricePerMonth} points/day
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>
                                <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <DepositComponent/>
                                </Paper>
                                <Button variant='contained' component={NavLink} to='booking'>
                                    Rent this item
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                    <GridBreak></GridBreak>
                    <Grid item xs={9} md={6} lg={5}>
                        <Paper>
                            <Stack p={1}>
                                <Typography variant='h5' fontWeight='bold'>
                                    {offerTitle}
                                </Typography>
                                <Typography variant='h6' fontWeight='bold' color='secondary'>
                                    In {offerCity}
                                </Typography>
                                <Typography>
                                    {offerDescription}
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} md={5} lg={4}>
                        <Paper style={{ dispaly: 'flex', alignItems: 'center' }}>
                            <Stack p={1} alignItems='center'>
                                <Typography variant='h6'>
                                    Availability
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <CalendarPicker shouldDisableDate={dateDisableFunction} minDate={Date.now()} maxDate={availableTo} onChange={function dummy() {}} sx={{minHeight: '100px'}}/>
                            </LocalizationProvider> 
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}   