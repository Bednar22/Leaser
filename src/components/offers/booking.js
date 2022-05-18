import { Grid, Container, Paper, Typography, Stack, Button, Box, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { GridBreak } from '../utilities/gridBreak';



export const Booking = () => {
    const [rentFrom, setRentFrom] = useState(null);
    const [rentTo, setRentTo] = useState(null);
    const [deposit, setDeposit] = useState(100);
    const [pricePerDay, setPricePerDay] = useState(10);
    const [pricePerWeek, setPricePerWeek] = useState(8);
    const [pricePerMonth, setPricePerMonth] = useState(5);
    const [availableFrom, setAvailableFrom] = useState(new Date(2022, 3, 20));
    const [availableTo, setAvailableTo] = useState(new Date(2022, 7, 26));
    const [previousTransactionDates, setPreviousTransactionDates] = useState([
        {dateFrom: new Date(2022, 5, 22), dateTo: new Date(2022, 5, 25)},
        {dateFrom: new Date(2022, 6, 12), dateTo: new Date(2022, 6, 18)}
    ])
    const [rentingPrice, setRentingPrice] = useState(null);
    const [total, setTotal] = useState(null);
    const [fromError, setFromError] = useState(null);
    const [toError, setToError] = useState(null);


    useEffect(() => {

        let price = null;

        if (fromError != null || toError != null) {
            return;
        }

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
        else {
            setRentingPrice(null);
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

    const dateDisableFunction = (date) => {
        if ( date < availableFrom || date > availableTo ) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <>
        <Container maxWidth='sm'>
            <Paper>
                <form>
                    <Box p={1}>
                        <Grid container justifyContent='center' alignContent='center' spacing={{ xs: 1, sm: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack justifyContent='center' alignContent='center' spacing={1}>
                                        <DatePicker 
                                            label='Rent from'
                                            value={rentFrom}
                                            onChange={(newValue) => {
                                                setRentFrom(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} size='small'/>}
                                            minDate={new Date()}
                                            maxDate={ rentTo != null ? getPreviousDayFromDate(rentTo) : getNextYearFromDate(new Date())}
                                            shouldDisableDate={dateDisableFunction}
                                            clearable={true}
                                            onError={(error)=>{setFromError(error)}}
                                            onAccept={() => { setFromError(null) }}
                                        />
                                        <DatePicker
                                            label='Rent to'
                                            value={rentTo}
                                            onChange={(newValue) => {
                                                setRentTo(newValue);
                                            }}
                                            minDate={rentFrom != null ? getNextDayFromDate(rentFrom): getNextDayFromDate(new Date())}
                                            maxDate={getNextYearFromDate(new Date())}
                                            shouldDisableDate={dateDisableFunction}
                                            renderInput={(params) => <TextField {...params} size='small'/>}
                                            clearable={true}
                                            onError={(error)=>{setToError(error)}}
                                            onAccept={() => { setToError(null) }}
                                        />
                                    </Stack>  
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                            </Grid>
                            <GridBreak/>
                            <Grid item xs={12} sm={4}>
                                <Button variant='outlined' color='secondary' component={NavLink} to='/offerDetails' fullWidth>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Button variant='contained' fullWidth>
                                    Confirm and pay
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </Container>
        </>
    )
}
