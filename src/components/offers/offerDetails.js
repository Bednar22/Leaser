import { Grid, Container, Paper, Typography, Stack, Button, Rating } from '@mui/material';
import { GridBreak } from '../utilities/gridBreak';

import { CalendarPicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns'


export const OfferDetails = ( {offerTitle, offerDescription, pricePerDay, pricePerWeek, pricePerMonth, deposit, offerImage, renterName, renterNickname, renterScore, availableFrom, availableTo, offerCity} ) => {
    
    const dateDisableFunction = (date) => {
        if ( date < availableFrom || date > availableTo ) {
            return true;
        }
        else {
            return false;
        }
    }

    const depositText = () => {
        let return_text;
        if (deposit != null) {
            return_text = `Deposit ${deposit}PLN`
        }
        else {
            return_text = 'Deposit not required'
        }
        return return_text;
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
                            <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Stack p={1} alignItems='center'>
                                    <Typography variant='h6'>
                                        {renterNickname}
                                    </Typography>
                                    <Rating readOnly precision={0.1} value={renterScore}/>
                                </Stack>
                            </Paper>
                            <Button variant='contained'>
                                Rent this item
                            </Button>
                            <Stack spacing={1} style={{ flex: '1' }}>
                                <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Typography p={1}>
                                        Day {pricePerDay}PLN/day
                                    </Typography>
                                </Paper>
                                <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Typography p={1}>
                                        Week {pricePerWeek}PLN/day
                                    </Typography>
                                </Paper>
                                <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Typography p={1}>
                                        Month {pricePerMonth}PLN/day
                                    </Typography>
                                </Paper>
                                <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Typography p={1}>
                                        {depositText()}
                                    </Typography>
                                </Paper>
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
                                <Typography variant='h6' >
                                    Item availability
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <CalendarPicker shouldDisableDate={dateDisableFunction} minDate={Date.now()} maxDate={availableTo} onChange={function dummy() {}} />
                            </LocalizationProvider> 
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}