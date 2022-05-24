import { useState, useEffect } from 'react';
import { Grid, Container, Skeleton } from '@mui/material';
import { SearchComponent } from './searchComponent';
import { GridBreak } from '../utilities/gridBreak';
import { FilterOffers } from './filterOffers';
import { SortOffers } from './sortOffers';
import { OfferTile } from './offerTile';
import axios from 'axios';
import SampleImagePath from '../../assets/sample-image.jpg';

export const MainOffersPage = (props) => {
    const testItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [sortBy, setSortBy] = useState('');
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        console.log(`sorting By: ${sortBy}`);
    }, [sortBy]);

    useEffect(() => {
        console.log(`category: ${categoryId}`);
    }, [categoryId]);

    useEffect(() => {
        const category = 2;
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get(`/api/Posts/${category}/Category/Detail`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                // setTitle(res.data.title);
                // setDescription(res.data.description);
                // setPricePerDay(res.data.price);
                // setPricePerWeek(res.data.pricePerWeek);
                // setPricePerMonth(res.data.pricePerMonth);
                // setAvailableFrom(new Date(res.data.availableFrom));
                // setAvailableTo(new Date(res.data.availableTo));
                // setCategoryId(res.data.categoryId);
                // setUserId(res.data.userId);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Container maxWidth='xl'>
                <Grid container direction='row' alignItems='center' justifyContent='space-evenly'>
                    <Grid item xs={4} md={2}>
                        <FilterOffers categoryIdMain={categoryId} changeCategoryIdMain={setCategoryId} />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <SortOffers sortByMain={sortBy} changeSortByMain={setSortBy} />
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
