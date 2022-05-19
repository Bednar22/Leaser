import { Grid, Container, Paper, Typography, Stack, Button, Rating, Box } from '@mui/material';
import { GridBreak } from '../utilities/gridBreak';
import { NavLink } from 'react-router-dom';

import { CalendarPicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { Booking } from './booking';

export const OfferDetails = ( {offerTitle, offerDescription, pricePerDay, pricePerWeek, pricePerMonth, deposit, offerImage, renterName, renterNickname, renterScore, availableFrom, availableTo, offerCity} ) => {
    
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