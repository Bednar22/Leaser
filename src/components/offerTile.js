import React from 'react';
import { Paper, Typography, Box, Stack, Grid } from '@mui/material';

import { Link } from 'react-router-dom';


export const OfferTile = (props) => {

    const renterName = props.renterName;
    const renterNickname = props.renterNickname;
    const renterScore = props.renterScore;
    const offerTitle = props.offerTitle;
    const pricePerDay = props.pricePerDay;
    const titleImage = props.titleImage;
    const offerCity = props.offerCity
    //const OfferUrl = props.OfferUrl;
    
    return (
        <>
            <Box className='offer-tile' sx={{borderRadius: '8px', 'background-color': 'white'}} borderWidth={100} minWidth={false} minHeight={false}>
                <Link to='/' style={{ 'text-decoration': 'none', 'width': '100%', 'height': '100%', 'color': 'black'}}>
                    <Paper className='offer-tile'>
                        <Stack sx={{p: 1}}>
                            <img src={titleImage} alt={offerTitle} style={{ 'border-radius': '8px', 'margin-bottom': '8px', 'width': '100%', 'height': '100%', 'object-fit': 'cover'}}></img>
                            <Stack className='typography-stack' direction='row' alignItems='center' justifyContent='space-between' style={{'border-radius': '8px', 'padding': '8px'}}>
                                <Stack>
                                    <Typography fontWeight='bold' variant='h5'>
                                        {offerTitle}
                                    </Typography>
                                    <Typography>
                                        {renterNickname} ({renterName})
                                    </Typography>
                                    <Typography>
                                        ({renterScore})
                                    </Typography>
                                </Stack>
                                <Stack alignItems='center'>
                                    <Typography fontWeight='bold' variant='h5'>
                                        {pricePerDay} PLN/day
                                    </Typography>
                                    <Typography>
                                        In {offerCity}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Link>
            </Box>
        </>
    );
};