import { Grid, Container, Paper, Typography, Stack, Button, Rating, Skeleton } from '@mui/material';
import { GridBreak } from '../utilities/gridBreak';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { CalendarPicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns'


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
    const [renterUserId, setRenterUserId] = useState(null);

    const [previousTransactions, setPreviousTransactions] = useState(null);

    const [dateDisableFunction, setDateDisableFunction] = useState(null);

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
                setRenterUserId(res.data.userId);
                console.log(res.data);
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

    }, [])

    useEffect( () => {
        if (availableFrom != null && availableTo != null && previousTransactions != null) { 
            setDateDisableFunction( () => (date) => {
                if ( date >= availableFrom && date <= availableTo ) {
                    for (const transaction of previousTransactions) {
                        let transactionStart = new Date(transaction.dateFrom);
                        let transactionEnd = new Date(transaction.dateTo);
                        transactionStart.setHours(0, 0, 0, 0);
                        transactionEnd.setHours(0, 0, 0, 0);
                        if (date >= transactionStart && date <= transactionEnd) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            });
        }
    }, [availableFrom, availableTo, previousTransactions])

    const MultilineTextSkeleton = ({ lines, width }) => {
        let skeletons = []
        for (let line = 0; line < lines; line++) {
            skeletons.push(<Skeleton variant='text' width={width} key={line}/>)
        }
        return skeletons;
    }

    const TopLeftPanel = () => {
        return (
            <>
                {offerImage ? (
                    <img src={offerImage} alt={offerTitle} height='100%' width='100%' style={{objectFit: 'cover', borderRadius: '4px'}}/>
                ) : (
                    <Skeleton variant='rectangular' height='100%'/>
                )}
            </>
        );
    }

    const TopRightPanel = () => {
        return (
            <Stack spacing={1} height='100%'>
                <Paper style={{ flex: '0.5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Stack p={1} alignItems='center'>
                        {renterNickname != null && renterUserId != null ? (
                            <NavLink to={`/user/profile/${renterUserId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant='h6' sx={{wordWrap: 'break-word'}} >
                                    {renterNickname}
                                </Typography>
                            </NavLink>
                        ) : (
                            <Skeleton variant='text' width='150px'/>
                        )}
                        {renterScore != null ? (
                            <Rating readOnly precision={0.1} value={renterScore}/>
                        ) : (
                            <Skeleton variant='text' width='100px'/>
                        )}                 
                    </Stack>
                </Paper>
                <Stack spacing={1} style={{ flex: '1' }}>
                    <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Stack direction='row' spacing={5} justifyContent='center' alignContent='center'>
                            <Stack justifyContent='center' alignItems='center'>
                                {pricePerDay != null ? (
                                    <Typography color='secondary' fontWeight='bold' variant='h6'>
                                        Day+
                                    </Typography>
                                ) : (
                                    <Skeleton variant='text' width='80px'/> 
                                )}
                                {pricePerDay != null ? (
                                    <Typography textAlign='center'>
                                        {pricePerDay} points/day
                                    </Typography>
                                ) : (
                                    <Skeleton variant='text' width='100px'/> 
                                )}
                            </Stack>
                            <Stack justifyContent='center' alignItems='center'>
                                {pricePerWeek != null ? (
                                    <Typography color='secondary' fontWeight='bold' variant='h6'>
                                        Week+
                                    </Typography>
                                ) : (
                                    <Skeleton variant='text' width='80px'/> 
                                )}
                                {pricePerWeek != null ? (
                                    <Typography textAlign='center'>
                                        {pricePerWeek} points/day
                                    </Typography>
                                ) : (
                                    <Skeleton variant='text' width='100px'/> 
                                )}
                            </Stack>
                            <Stack justifyContent='center' alignItems='center'>
                                {pricePerMonth != null ? (
                                    <Typography color='secondary' fontWeight='bold' variant='h6'>
                                        Month+
                                    </Typography>
                                ) : (
                                    <Skeleton variant='text' width='80px'/> 
                                )}
                                {pricePerMonth != null ? (
                                    <Typography textAlign='center'>
                                        {pricePerMonth} points/day
                                    </Typography>
                                ) : (
                                    <Skeleton variant='text' width='100px'/> 
                                )}
                            </Stack>
                        </Stack>
                    </Paper>
                    <Paper style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Stack justifyContent='center' alignItems='center'>
                            {deposit != null ? (
                                <Typography variant='h6' color='secondary' fontWeight='bold'>
                                    Deposit
                                </Typography>
                            ) : (
                                <Skeleton variant='text' width='100px'/> 
                            )}
                            {deposit != null ? (
                                <Typography>
                                    {deposit} points
                                </Typography>
                            ) : (
                                <Skeleton variant='text' width='150px'/> 
                            )}
                        </Stack>
                    </Paper>
                    {dateDisableFunction != null ? (
                        <Button variant='contained' component={NavLink} to='booking'>
                            Rent this item
                        </Button>
                    ) : (
                        <Skeleton variant='rectangular' width='100%' height='40px'/> 
                    )}

                </Stack>
            </Stack>
        );
    }

    const BottomLeftPanel = () => {
        return (
            <Paper>
                <Stack p={1}>
                    {offerTitle != null ? (
                        <Typography variant='h5' fontWeight='bold' sx={{wordWrap: 'break-word'}}>
                            {offerTitle}
                        </Typography>
                    ) : ( 
                    <Skeleton variant='text' width='50%'/>
                    )}
                    {offerCity != null ? (
                        <Typography variant='h6' fontWeight='bold' color='secondary' sx={{wordWrap: 'break-word'}}>
                            In {offerCity}
                        </Typography>
                    ) : (
                        <Skeleton variant='text' width='30%'/>
                    )}
                    {offerDescription != null ? (
                        <Typography sx={{wordWrap: 'break-word'}}>
                            {offerDescription}
                        </Typography>
                    ) : (
                        <MultilineTextSkeleton lines={10} width='100%'/>
                    )}
                </Stack>
            </Paper>
        );
    }

    const BottomRightPanel = () => {
        return (
            <Paper style={{ dispaly: 'flex', alignItems: 'center' }}>
                <Stack p={1} alignItems='center'>
                    {dateDisableFunction != null ? (
                        <Typography variant='h6'>
                            Availability
                        </Typography>
                    ) : (
                        <Skeleton variant='text' width='40%'/>
                    )}

                    {dateDisableFunction != null ? (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <CalendarPicker shouldDisableDate={dateDisableFunction} minDate={Date.now()} maxDate={availableTo} onChange={function dummy() {}} sx={{minHeight: '100px'}}/>
                        </LocalizationProvider>
                    ) : (
                        <Skeleton variant='rectangular' width='100%' height='300px'/>
                    )}

                </Stack>
            </Paper>
        );
    }
    
    return (
        <>
            <Container maxWidth='xl'>
                <Grid container justifyContent='center' alignContent='center' spacing={2}>
                    <Grid item xs={9} md={6} lg={5} height='350px'>
                        <TopLeftPanel/>
                    </Grid>
                    <Grid item xs={9} md={5} lg={4} height='350px'>
                        <TopRightPanel/>
                    </Grid>
                    <GridBreak></GridBreak>
                    <Grid item xs={9} md={6} lg={5} height='350px'>
                        <BottomLeftPanel/>
                    </Grid>
                    <Grid item xs={9} md={5} lg={4} height='350px'>
                        <BottomRightPanel/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}   