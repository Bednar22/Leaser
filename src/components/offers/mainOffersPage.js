import { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import { SearchComponent } from './searchComponent';
import { GridBreak } from '../utilities/gridBreak';
import { FilterOffers } from './filterOffers';
import { SortOffers } from './sortOffers';
import { OfferTile } from './offerTile';
import axios from 'axios';

export const MainOffersPage = (props) => {
    const [sortBy, setSortBy] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [offers, setOffers] = useState([]);

    const priceAscSort = (a, b) => {
        return b.price - a.price;
    };

    const priceDscSort = (a, b) => {
        return a.price - b.price;
    };

    const ratingAscSort = (a, b) => {
        return b.rating - a.rating;
    };

    const ratingDscSort = (a, b) => {
        return a.rating - b.rating;
    };

    const getOffersByCategory = () => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get(`/api/Posts/${categoryId}/Category/Detail`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOffers(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getSortedOffers = () => {
        let arrCopy = offers;
        switch (sortBy) {
            case 'priceAsc':
                arrCopy.sort(priceAscSort);
                setOffers(arrCopy);
                break;
            case 'priceDsc':
                arrCopy.sort(priceDscSort);
                setOffers(arrCopy);
                break;
            case 'ratingAsc':
                arrCopy.sort(ratingAscSort);
                setOffers(arrCopy);
                break;
            case 'ratingDsc':
                arrCopy.sort(ratingDscSort);
                setOffers(arrCopy);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        getSortedOffers();
    }, [sortBy]);

    useEffect(() => {
        console.log(`category: ${categoryId}`);
        getOffersByCategory();
    }, [categoryId]);

    useEffect(() => {
        // later it will be changed to getting all the posts at the beginning
        const category = 2;
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get(`/api/Posts/${category}/Category/Detail`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOffers(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Container maxWidth='xl'>
                <Grid container direction='row' alignItems='center' justifyContent='space-evenly'>
                    <Grid item xs={3} md={2}>
                        <FilterOffers categoryIdMain={categoryId} changeCategoryIdMain={setCategoryId} />
                    </Grid>
                    <Grid item xs={1} md={1}></Grid>
                    <Grid item xs={3} md={2}>
                        <SortOffers sortByMain={sortBy} changeSortByMain={setSortBy} />
                    </Grid>
                    <Grid item xs={0} md={3}>
                        <GridBreak></GridBreak>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <SearchComponent />
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ my: 2 }}>
                    {offers &&
                        offers.map((item) => {
                            return (
                                <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
                                    <OfferTile
                                        postId={item.id}
                                        renterNickname={item.userNickName}
                                        renterScore={item.rating}
                                        offerTitle={item.title}
                                        pricePerDay={item.price}
                                        offerCity={item.city}
                                    ></OfferTile>
                                </Grid>
                            );
                        })}
                </Grid>
            </Container>
        </>
    );
};
