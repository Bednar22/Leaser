import { useState } from 'react';
import { Grid, Container, Skeleton, Stack } from '@mui/material';
import { SearchComponent } from './searchComponent';
import { GridBreak } from '../utilities/gridBreak';
import { FilterOffers } from './filterOffers';
import { SortOffers } from './sortOffers';
export const MainOffersPage = (props) => {
    const testItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <>
            <Container maxWidth='xl' >
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

                <Grid container spacing={4} sx={{ my: 2 }}>
                    {testItems.map((item) => {
                        return (
                            <Grid item xs={4} md={3}>
                                {/* Replace skeleton with offer tile */}
                                <Skeleton sx={{ height: 300 }} variant='rectangular' />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};
