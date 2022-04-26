import { Grid, Container, Paper, Typography, Stack, Button, Rating } from '@mui/material';
import { GridBreak } from '../utilities/gridBreak';


export const OfferDetails = ( {offerTitle, offerDescription, pricePerDay, pricePerWeek, pricePerMonth, deposit, offerImage, renterName, renterNickname, renterScore, availableFrom, availableTo, offerCity} ) => {
    return (
        <>
            <Container maxWidth='xl'>
                <Grid container justifyContent='center' alignContent='center' spacing={2}>
                    <Grid item xs={6} md={5} lg={4} height='300px'>
                        <img src={offerImage} alt={offerTitle} height='100%' width='100%' style={{objectFit: 'cover', borderRadius: '4px'}}/>
                    </Grid>
                    <Grid item xs={6} md={5} lg={4} height='300px'>
                        <Stack spacing={1} height='100%'>
                            <Paper style={{ flex: '0.3', display: 'flex', alignItems: 'center'}}>
                                <Stack p={1}>
                                    <Typography variant='h6' fontWeight='bold'>
                                        {renterNickname}
                                    </Typography>
                                    <Rating readOnly precision={0.1} value={renterScore}/>
                                </Stack>
                            </Paper>
                            <Button variant='contained'>
                                Rent this item
                            </Button>
                            <Paper style={{ flex: '0.7' }}>
                                <Typography>
                                    Day {pricePerDay}PLN/day
                                </Typography>
                                <Typography>
                                    Week {pricePerWeek}PLN/day
                                </Typography>
                                <Typography>
                                    Month {pricePerMonth}PLN/day
                                </Typography>
                                <Typography>
                                    Deposit {deposit}PLN
                                </Typography>
                                
                            </Paper>
                        </Stack>
                    </Grid>
                    <GridBreak></GridBreak>
                    <Grid item xs={6} md={5} lg={4}>
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
                    <Grid item xs={6} md={5} lg={4}>
                        <Paper>
                            Availability
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}