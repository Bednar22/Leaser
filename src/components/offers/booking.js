import { Grid, Container, Paper, Typography, Stack, Button, Box, TextField, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { GridBreak } from '../utilities/gridBreak';



export const Booking = () => {

    const params = useParams();
    const offerId = params.id;

    const [rentFrom, setRentFrom] = useState(null);
    const [rentTo, setRentTo] = useState(null);
    const [deposit, setDeposit] = useState(null);
    const [pricePerDay, setPricePerDay] = useState(null);
    const [pricePerWeek, setPricePerWeek] = useState(null);
    const [pricePerMonth, setPricePerMonth] = useState(null);
    const [availableFrom, setAvailableFrom] = useState(null);
    const [availableTo, setAvailableTo] = useState(null);
    const [previousTransactions, setPreviousTransactions] = useState(null);

    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [rentFromDateDisableFunction, setRentFromDateDisableFunction] = useState(null);
    const [rentToDateDisableFunction, setRentToDateDisableFunction] = useState(null);

    const [rentingPrice, setRentingPrice] = useState(null);
    const [total, setTotal] = useState(null);
    const [fromError, setFromError] = useState(null);
    const [toError, setToError] = useState(null);


    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
        },
    };

    useEffect(() => {
        axios
            .get(`/api/Posts/${offerId}`, config)
            .then( (res) => {
                setPricePerDay(res.data.price);
                setPricePerWeek(res.data.pricePerWeek);
                setPricePerMonth(res.data.pricePerMonth);
                setDeposit(res.data.depositValue);
                setAvailableFrom(new Date(res.data.availableFrom));
                setAvailableTo(new Date(res.data.availableTo));
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

    }, [])

    useEffect( () => {
    }, [allDataLoaded, pricePerDay, pricePerWeek, pricePerMonth, deposit, availableFrom, availableTo, previousTransactions])


    useEffect(() => {

        let price = null;

        if (rentFrom != null && rentTo != null) {
            if (fromError == null && toError == null) {
                const rentingTimeMs = rentTo - rentFrom;
                const rentingDays = Math.round(rentingTimeMs / (1000 * 60 * 60 * 24));
                if (rentingDays >= 30) {
                    price = Math.round(rentingDays * pricePerMonth);
                }
                else if (rentingDays < 30 && rentingDays >= 7) {
                    price = Math.round(rentingDays * pricePerWeek);
                }
                else if (rentingDays < 7 && rentingDays > 0) {
                    price = Math.round(rentingDays * pricePerDay);
                }
            }
        }

        setRentingPrice(price)
        if (price != null) {
            setTotal(price + deposit);
        }
        else {
            setTotal(null);
        }
        
    }, [rentFrom, rentTo, pricePerDay, pricePerMonth, pricePerWeek, deposit, fromError, toError])

    const getNextYearFromDate = (date) => {
        let returnDate = new Date(date);
        returnDate.setFullYear(date.getFullYear() + 1)
        return returnDate;
    }

    const getNextDayFromDate = (date) => {
        let returnDate = new Date(date);
        returnDate.setDate(date.getDate() + 1);
        return returnDate;
    }

    const getPreviousDayFromDate = (date) => {
        let returnDate = new Date(date);
        returnDate.setDate(date.getDate() - 1);
        return returnDate;
    }


    useEffect( () => {
        if (availableFrom != null && availableTo != null && previousTransactions != null) { 
            setRentFromDateDisableFunction( () => (date) => {
                if ( date >= availableFrom && date <= availableTo ) {
                    for (const transaction of previousTransactions) {                        
                        let transactionStart = new Date(transaction.dateFrom);
                        let transactionEnd = new Date(transaction.dateTo);
                        transactionStart.setHours(0, 0, 0, 0);
                        transactionEnd.setHours(0, 0, 0, 0);
                        if (rentTo == null || toError != null) {
                            if (date >= transactionStart && date <= transactionEnd) {
                                return true;
                            }
                        }
                        else {
                            if (date <= transactionEnd && transactionEnd <= rentTo) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            });
        }
    }, [availableFrom, availableTo, previousTransactions, rentFrom, rentTo, toError])

    useEffect( () => {
        if (availableFrom != null && availableTo != null && previousTransactions != null) { 
            setRentToDateDisableFunction( () => (date) => {
                if ( date >= availableFrom && date <= availableTo ) {
                    for (const transaction of previousTransactions) {                        
                        let transactionStart = new Date(transaction.dateFrom);
                        let transactionEnd = new Date(transaction.dateTo);
                        transactionStart.setHours(0, 0, 0, 0);
                        transactionEnd.setHours(0, 0, 0, 0);
                        if (rentFrom == null || fromError != null) {
                            if (date >= transactionStart && date <= transactionEnd) {
                                return true;
                            }
                        }
                        else {
                            if (date >= transactionStart && transactionStart >= rentFrom) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            });
        }
    }, [availableFrom, availableTo, previousTransactions, rentFrom, rentTo, fromError])

    return (
        <>
        <Container maxWidth='sm'>
            <Paper>
                <form>
                    <Box p={3}>
                        <Grid container justifyContent='center' alignContent='center' spacing={{ xs: 1, sm: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack justifyContent='center' alignContent='center' spacing={1}>
                                        {rentFromDateDisableFunction ? (
                                            <DatePicker 
                                                label='Rent from'
                                                value={rentFrom}
                                                onChange={(newValue) => {
                                                    setRentFrom(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} size='small'/>}
                                                minDate={new Date()}
                                                maxDate={ rentTo != null ? getPreviousDayFromDate(rentTo) : getNextYearFromDate(new Date())}
                                                shouldDisableDate={rentFromDateDisableFunction}
                                                clearable={true}
                                                onError={(error)=>{setFromError(error)}}
                                                onAccept={() => { setFromError(null) }}
                                                defaultCalendarMonth={rentTo ? rentTo : null}
                                            />
                                        ) : (
                                            <Skeleton variant='rectangular' height='40px'/>
                                        )}
                                        {rentToDateDisableFunction ? (
                                            <DatePicker
                                            label='Rent to'
                                            value={rentTo}
                                            onChange={(newValue) => {
                                                setRentTo(newValue);
                                            }}
                                            minDate={rentFrom != null ? getNextDayFromDate(rentFrom): getNextDayFromDate(new Date())}
                                            maxDate={getNextYearFromDate(new Date())}
                                            shouldDisableDate={rentToDateDisableFunction}
                                            renderInput={(params) => <TextField {...params} size='small'/>}
                                            clearable={true}
                                            onError={(error)=>{setToError(error)}}
                                            onAccept={() => { setToError(null) }}
                                            defaultCalendarMonth={rentFrom ? rentFrom : null}
                                        />
                                        ) : (
                                            <Skeleton variant='rectangular' height='40px'/>
                                        )}
                                    </Stack>  
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {(deposit != null && pricePerDay != null && pricePerWeek != null && pricePerMonth != null) ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={4} sm={5}>
                                            <Typography fontWeight='bold'>
                                                Deposit
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={5}>
                                            <Typography>
                                                {deposit != null ? (deposit + ' points') : null}
                                            </Typography> 
                                        </Grid>
                                        <Grid item xs={4} sm={5}>
                                            <Typography fontWeight='bold'>
                                                Price
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography sx={{ pr: 1 }}>
                                                {rentingPrice != null ? (rentingPrice + ' points') : null}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={5}>
                                            <Typography variant='h6' fontWeight='bold'>
                                                Total
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='h6'>
                                                {total != null ? (total + ' points') : null}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Skeleton variant='rectangular' height='100%'/>
                                )}
                            </Grid>
                            <GridBreak/>
                            <Grid item xs={12} sm={4}>
                                {(rentFromDateDisableFunction && rentToDateDisableFunction) ? 
                                (
                                    <Button variant='outlined' color='secondary' component={NavLink} to={`/offers/offerDetails/${offerId}`} fullWidth>
                                        Cancel
                                    </Button>
                                ) : (
                                    <Skeleton variant='rectangular' height='40px'/>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                {(rentFromDateDisableFunction && rentToDateDisableFunction) ?
                                (
                                    <Button variant='contained' fullWidth>
                                        Confirm and pay
                                    </Button>
                                ) : (
                                    <Skeleton variant='rectangular' height='40px'/>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </Container>
        </>
    )
}
