import { Grid, Container, Paper, Typography, Stack, Button, Rating, Box, Skeleton } from '@mui/material';
import { GridBreak } from '../utilities/gridBreak';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { CalendarPicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { SettingsApplicationsRounded } from '@mui/icons-material';


export const OfferDetails = () => {

    const params = useParams();
    const offerId = params.id;

    const [offerTitle, setOfferTitle] = useState(null);
    const [offerDescription, setOfferDescription] = useState(null);
    const [offerImage, setOfferImage] = useState(null);
    const [availableFrom, setAvailableFrom] = useState(null);
    const [availableTo, setAvailableTo] = useState(null);
    const [pricePerDay, setPricePerDay] = useState(null);
    const [pricePerWeek, setPricePerWeek] = useState(null);
    const [pricePerMonth, setPricePerMonth] = useState(null);
    const [deposit, setDeposit] = useState(null);

    const [renterNickname, setRenterNickname] = useState(null);
    const [offerCity, setOfferCity] = useState(null);
    const [renterScore, setRenterScore] = useState(null);

    const [previousTransactions, setPreviousTransactions] = useState(null);

    const [dateDisableFunction, setDateDisableFunction] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
        },
    };

    const imageConfig = {
        responseType: 'blob', 
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`
        }
    };

    useEffect(() => {
        axios
            .get(`/api/Posts/${offerId}`, config)
            .then( (res) => {
                setOfferTitle(res.data.title);
                setOfferDescription(res.data.description);
                setRenterScore(res.data.rating);
                setPricePerDay(res.data.price);
                setPricePerWeek(res.data.pricePerWeek);
                setPricePerMonth(res.data.pricePerMonth);
                setDeposit(res.data.depositValue);
                setOfferCity(res.data.city);
                setAvailableFrom(new Date(res.data.availableFrom));
                setAvailableTo(new Date(res.data.availableTo));
                setRenterNickname(res.data.userNickName);
            })
            .catch((error) => {
                console.log(error)
        });

        axios
            .get(`/api/Posts/${offerId}/Image`, imageConfig)
            .then( (res) => {
                setOfferImage(URL.createObjectURL(res.data))
            })
            .catch((error) => {
                console.log(error)
            });

        axios
            .get(`/api/Transactions/${offerId}/Post`, config)
            .then( (res) => {
                setPreviousTransactions(res.data);
            })
            .catch((error) => {
                console.log(error)
            });

        setLoaded(true);

    }, [])

    useEffect( () => {
        if (availableFrom != null && availableTo != null && previousTransactions != null) {
            
            const func = (date) => {
                console.log(date);
                if ( date >= availableFrom && date <= availableTo ) {
                    for (const transaction of previousTransactions) {
                        if (date >= new Date(transaction.dateFrom) && date <= new Date(transaction.dateTo))
                            return true;
                    }
                    return false;
                }
                else {
                    return true;
                }
            }
            
            console.log(typeof(func));
            setDateDisableFunction({f: func});
        }

    }, [availableFrom, availableTo, previousTransactions])

    useEffect(()=>{
        console.log(dateDisableFunction)
    }, [dateDisableFunction])
    
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
                                    <Typography variant='h6' sx={{wordWrap: 'break-word'}}>
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
                                            <Typography textAlign='center'>
                                                {pricePerDay} points/day
                                            </Typography>
                                        </Stack>
                                        <Stack justifyContent='center' alignItems='center'>
                                            <Typography color='secondary' fontWeight='bold' variant='h6'>
                                                Week+
                                            </Typography>
                                            <Typography textAlign='center'>
                                                {pricePerWeek} points/day
                                            </Typography>
                                        </Stack>
                                        <Stack justifyContent='center' alignItems='center'>
                                            <Typography color='secondary' fontWeight='bold' variant='h6'>
                                                Month+
                                            </Typography>
                                            <Typography textAlign='center'>
                                                {pricePerMonth} points/day
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>
                                <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Stack justifyContent='center' alignItems='center'>
                                        <Typography variant='h6' color='secondary' fontWeight='bold'>
                                            Deposit
                                        </Typography>
                                        <Typography>
                                            {deposit} points
                                        </Typography>
                                    </Stack>
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
                                <Typography variant='h5' fontWeight='bold' sx={{wordWrap: 'break-word'}}>
                                    {offerTitle}
                                </Typography>
                                <Typography variant='h6' fontWeight='bold' color='secondary' sx={{wordWrap: 'break-word'}}>
                                    In {offerCity}
                                </Typography>
                                <Typography sx={{wordWrap: 'break-word'}}>
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
                                    <CalendarPicker shouldDisableDate={dateDisableFunction ? dateDisableFunction.f : null} minDate={Date.now()} maxDate={availableTo} onChange={function dummy() {}} sx={{minHeight: '100px'}}/>
                                </LocalizationProvider>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}   