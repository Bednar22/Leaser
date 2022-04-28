import React from 'react';
import { Paper, Typography, Box, Stack, Rating } from '@mui/material';

import { Link } from 'react-router-dom';


export const OfferTile = ({ renterName, renterNickname, renterScore, offerTitle, pricePerDay, titleImage, offerCity, OfferUrl }) => {    
    return (
        <>
            <Box className='offer-tile' sx={{borderRadius: '8px', 'background-color': 'white'}}>
                <Link to='/' style={{ textDecoration: 'none', width: '100%', height: '100%', color: 'black'}}>
                    <Paper className='offer-tile'>
                        <Stack sx={{p: 1}}>
                            <img src={titleImage} alt={offerTitle} style={{ borderRadius: '8px', marginBottom: '8px', width: '100%', height: '200px', objectFit: 'cover'}}></img>
                            <Stack className='typography-stack' direction='row' alignItems='center' justifyContent='space-between' style={{borderRadius: '8px', padding: '8px'}}>
                                <Stack>
                                    <Typography fontWeight='bold'>
                                        {offerTitle}
                                    </Typography>
                                    <Typography>
                                        {renterNickname}
                                    </Typography>
                                    <Rating readOnly precision={0.1} value={renterScore}/>
                                </Stack>
                                <Stack alignItems='center'>
                                    <Typography fontWeight='bold'>
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