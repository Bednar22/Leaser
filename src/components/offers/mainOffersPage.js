import { useState } from 'react';
import { Grid, Container, Skeleton } from '@mui/material';
import { SearchComponent } from './searchComponent';
import { GridBreak } from '../utilities/gridBreak';
import { FilterOffers } from './filterOffers';
import { SortOffers } from './sortOffers';
import { OfferTile } from './offerTile';

import SampleImagePath from '../../assets/sample-image.jpg';

export const MainOffersPage = (props) => {
    const testItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <>
            <Container maxWidth='xl'>
                <Grid container direction='row' alignItems='center' justifyContent='space-evenly'>
                    <Grid item xs={4} md={2}>
                        <FilterOffers />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <SortOffers />
                    </Grid>
                    <Grid item xs={0} md={4}>
                        <GridBreak></GridBreak>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <SearchComponent />
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ my: 2 }} justifyContent='center'>
                    {testItems.map((item) => {
                        return (
                            <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
                                <OfferTile
                                    renterName='Jan Kowalski'
                                    renterNickname='jkowalski'
                                    renterScore={4.5}
                                    offerTitle='Used digital camera'
                                    pricePerDay={10}
                                    titleImage={SampleImagePath}
                                    offerCity='Wrocław'
                                ></OfferTile>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};
