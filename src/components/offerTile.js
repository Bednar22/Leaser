import React from 'react';
import { Paper, Typography, Box, Stack, Grid } from '@mui/material';

import { Link } from 'react-router-dom';

import StarIconPath from '../star-icon.png'


export const OfferTile = (props) => {

    const renterName = props.renterName;
    const renterNickname = props.renterNickname;
    const renterScore = props.renterScore;
    const offerTitle = props.offerTitle;
    const pricePerDay = props.pricePerDay;
    const titleImage = props.titleImage;
    //const OfferUrl = props.OfferUrl;
    
    return (
        <>
            <Box className='offer-tile' sx={{borderRadius: '8px', maxWidth: '600px', 'background-color': 'white'}} borderWidth={100} minWidth={false} minHeight={false}>
                <Link to='/' style={{ 'text-decoration': 'none', 'width': '100%', 'height': '100%', 'color': 'black'}}>
                    <Paper className='offer-tile'>
                        <Stack justifyContent='center' alignContent='center' sx={{p: 2}}>
                            <img src={titleImage} alt={offerTitle} style={{ 'border-radius': '8px', 'width': '100%', 'object-fit': 'cover', 'margin-bottom': '8px'}}></img>
                            <Stack direction='column'>
                                <Typography className='offer-tile-text' fontWeight='bold'>
                                    {offerTitle}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid container item xs={6} direction='column'>
                                        <Typography className='offer-tile-text'>
                                            {renterName} ({renterNickname})
                                        </Typography>
                                        <Typography className='offer-tile-text'>
                                            {renterScore}
                                        </Typography>
                                    </Grid>
                                    <Grid container item xs={6} direction='column'>
                                        <Typography className='offer-tile-text' fontWeight='bold'>
                                            {pricePerDay} PLN/day
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>
                    </Paper>
                </Link>
            </Box>
        </>
    );
};