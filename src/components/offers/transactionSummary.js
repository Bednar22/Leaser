import { Grid, Container, Paper, Typography, Stack, Button, Box, TextField, Skeleton, Card, CardHeader, CardMedia, CardContent, Divider, CardActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import DateRangeIcon from '@mui/icons-material/DateRange';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SellIcon from '@mui/icons-material/Sell';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export const TransactionSummary = () => {

    const params = useParams();
    const transactionId = params.id;

    const navigate = useNavigate();

    const [offerId, setOfferId] = useState(null);
    const [renterNickname, setRenterNickname] = useState(null);
    const [offerTitle, setOfferTitle] = useState(null);
    const [offerImage, setOfferImage] = useState(null);
    const [paidPrice, setPaidPrice] = useState(null);
    const [rentFrom, setRentFrom] = useState(null);
    const [rentTo, setRentTo] = useState(null);

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

        let offerIdLocal = null;

        axios
            .get(`/api/Transactions/${transactionId}`, config)
            .then( (res) => {
                offerIdLocal = res.data.postId;
                setOfferId(offerIdLocal);
                setPaidPrice(res.data.price);
                setRentFrom(res.data.dateFrom);
                setRentTo(res.data.dateTo);

                axios
                .get(`/api/Posts/${offerIdLocal}`, config)
                .then( (res) => {
                    setOfferTitle(res.data.title);
                    setRenterNickname(res.data.userNickName);
                })
                .catch((error) => {
                    console.log(error)
                });
    
                axios
                .get(`/api/Posts/${offerIdLocal}/Image`, imageConfig)
                .then( (res) => {
                    setOfferImage(URL.createObjectURL(res.data))
                })
                .catch((error) => {
                    console.log(error)
                });

            })
            .catch((error) => {
                console.log(error)
            });

        
    }, [])


    return (
        <>
        <Container maxWidth='md'>
            <Card sx={{p: 1 }}>
                <CardHeader
                    title={
                    <Typography variant='h5'>
                        Transaction accepted
                    </Typography>}
                />
                <Divider />
                <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={5}>
                        <Stack>
                            {offerTitle ? (
                                <Typography variant='h6' fontWeight='bold' sx={{wordWrap: 'break-word'}}>
                                    {offerTitle}
                                </Typography>
                            ) : (
                                <Skeleton width='250px'/>
                            )}
                            {offerImage ? (
                                <CardMedia
                                    component='img'
                                    image={offerImage}
                                    alt='offer image'
                                />
                            ) : (
                                <Skeleton variant='rectangular' width='300px' height='200px'/>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item sx={1}>
                        <Divider orientation='vertical'/>
                    </Grid>
                    

                    <Grid item>
                        <Stack> 
                            {renterNickname ? (
                                    <Stack direction='row' spacing={2}>
                                        <PersonIcon/>
                                        <Typography sx={{wordWrap: 'break-word'}}>
                                            Leaser: {renterNickname}
                                        </Typography>
                                    </Stack>
                                ) : (
                                    <Skeleton width='250px'/>
                                )}        
                            {rentFrom && rentTo ? (
                                <Stack direction='row' spacing={2}>     
                                    <DateRangeIcon/>
                                    <Typography sx={{wordWrap: 'break-word'}}>
                                        Date range: {rentFrom.slice(0, 10)} - {rentTo.slice(0, 10)}
                                    </Typography>
                                </Stack>
                            ) : (
                                <Skeleton />
                            )}
                            {paidPrice != null ? (
                                <Stack direction='row' spacing={2}>     
                                    <SellIcon/>
                                    <Typography sx={{wordWrap: 'break-word'}}>
                                        Price: {paidPrice} points
                                    </Typography>
                                </Stack>
                            ) : (
                                <Skeleton/>
                            )}
                        </Stack>
                    </Grid>

                </Grid>
                </CardContent>
                <CardActions>
                    {offerId != null ? (
                        <Button size='small' variant='contained' component={NavLink} to={`/offers/offerDetails/${offerId}`}>
                            View related offer
                        </Button>
                    ) : (
                        <Skeleton variant='rectangular' width='170px' height='30px' />
                    )}
                    {offerId != null ? (
                        <Button size='small' variant='outlined' color='secondary' component={NavLink} to='/home'>
                            Back to Homepage
                        </Button>
                    ) : (
                        <Skeleton variant='rectangular' width='170px' height='30px' />
                    )}
                </CardActions>
            </Card>
        </Container>
        </>
    );
}