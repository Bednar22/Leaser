import { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import { SearchComponent } from './searchComponent';
import { GridBreak } from '../utilities/gridBreak';
import { FilterOffers } from './filterOffers';
import { SortOffers } from './sortOffers';
import { OfferTile } from './offerTile';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export const MainOffersPage = (props) => {
    const token = window.localStorage.getItem('leaserToken');
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState(null);
    const [categoryId, setCategoryId] = useState(searchParams.get('category'));
    const [searchBy, setSearchBy] = useState(null);
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
        if (categoryId === -1) {
            getAllPosts();
        } else
            axios
                .get(`/api/Posts/${categoryId}/Category/Detail`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setOffers(res.data);
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

    const getAllPosts = () => {
        axios
            .get(`/api/Posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOffers(res.data);
                console.log('BIORE WSZYSTKO');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getSortedOffers();
    }, [sortBy]);

    useEffect(() => {
        getOffersByCategory();
    }, [categoryId]);

    useEffect(() => {
        let searchCat = searchParams.get('category');
        console.log(searchCat);
        if (!searchCat) {
            getAllPosts();
        } else {
            setCategoryId(searchCat);
        }
    }, []);

    useEffect(() => {
        if (searchBy !== '') {
            axios
                .get(`/api/Posts/${searchBy}/Detail`, {
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
        } else {
            getAllPosts();
            console.log('Gówno search');
        }
    }, [searchBy]);

    return (
        <>
            <Container maxWidth='xl'>
                <Grid container direction='row' alignItems='center' justifyContent='space-evenly'>
                    <Grid item xs={3} md={2}>
                        <FilterOffers
                            categoryIdMain={categoryId}
                            changeCategoryIdMain={setCategoryId}
                            setSearchParams={setSearchParams}
                        />
                    </Grid>
                    <Grid item xs={1} md={1}></Grid>
                    <Grid item xs={3} md={2}>
                        <SortOffers sortByMain={sortBy} changeSortByMain={setSortBy} />
                    </Grid>
                    <Grid item xs={0} md={3}>
                        <GridBreak></GridBreak>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <SearchComponent setSearchBy={setSearchBy} />
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
