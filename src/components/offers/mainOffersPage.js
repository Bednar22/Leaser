import { useState, useEffect } from 'react';
import { Grid, Container, Pagination, Box, Skeleton, Typography } from '@mui/material';
import { SearchComponent } from './searchComponent';
import { GridBreak } from '../utilities/gridBreak';
import { FilterOffers } from './filterOffers';
import { SortOffers } from './sortOffers';
import { OfferTile } from './offerTile';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export const MainOffersPage = ({ search, setSearch }) => {
    const token = window.localStorage.getItem('leaserToken');
    const maxOffersPerPage = 8;
    const [totalPages, setTotalPages] = useState(null);
    const [lowerIndex, setLowerIndex] = useState(null);
    const [upperIndex, setUpperIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [searchBy, setSearchBy] = useState(null);
    const [offers, setOffers] = useState([]);

    //sorting functions
    const priceAscSort = (a, b) => {
        return a.price - b.price;
    };

    const priceDscSort = (a, b) => {
        return b.price - a.price;
    };

    const ratingAscSort = (a, b) => {
        return a.rating - b.rating;
    };

    const ratingDscSort = (a, b) => {
        return b.rating - a.rating;
    };

    const getAllPosts = () => {
        axios
            .get(`/api/Posts/Detail`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (sortBy !== null) {
                    getSortedOffers(sortBy, res.data);
                } else {
                    setOffers(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getOffersByCategory = (category) => {
        setCategoryId(category);
        if (category === -1 || category === null || category === undefined) {
            getAllPosts();
        } else
            axios
                .get(`/api/Posts/${category}/Category/Detail`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (sortBy !== null) {
                        getSortedOffers(sortBy, res.data);
                    } else {
                        setOffers(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
    };

    const getSortedOffers = (sortPar, offersArray = offers) => {
        setSortBy(sortPar);
        let arrCopy = [...offersArray];
        switch (sortPar) {
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

    const searchForOffers = (searchPhrase) => {
        setSearchBy(searchPhrase);
        setCategoryId(-1);
        if (searchBy !== '') {
            axios
                .get(`/api/Posts/${searchPhrase}/Detail`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (sortBy === null) {
                        setOffers(res.data);
                    } else {
                        getSortedOffers(sortBy, res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            getAllPosts();
        }
    };

    useEffect(() => {
        if (search) {
            searchForOffers(search);
            setSearch(null);
        } else {
            let searchCat = searchParams.get('category');
            getOffersByCategory(searchCat);
        }
    }, []);

    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
        setLowerIndex((value - 1) * maxOffersPerPage);
        if (value * maxOffersPerPage > offers.length) {
            setUpperIndex(offers.length);
        }
        setUpperIndex(value * maxOffersPerPage);
    };

    useEffect(() => {
        setTotalPages(Math.ceil(offers.length / maxOffersPerPage));
        handlePaginationChange(null, 1);
    }, [offers]);

    return (
        <>
            <Container maxWidth='xl' justifyItems='center' alignItems='center'>
                <Grid container direction='row' alignItems='center' justifyContent='space-evenly'>
                    <Grid item xs={3} md={2}>
                        <FilterOffers
                            categoryIdMain={categoryId}
                            setSearchParams={setSearchParams}
                            getOffersByCategory={getOffersByCategory}
                        />
                    </Grid>
                    <Grid item xs={1} md={1}></Grid>
                    <Grid item xs={3} md={2}>
                        <SortOffers
                            sortByMain={sortBy}
                            changeSortByMain={setSortBy}
                            getSortedOffers={getSortedOffers}
                        />
                    </Grid>
                    <Grid item xs={0} md={3}>
                        <GridBreak></GridBreak>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <SearchComponent searchForOffers={searchForOffers} />
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ my: 2 }}>
                    {offers.length !== 0 ? (
                        offers.slice(lowerIndex, upperIndex).map((item) => {
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
                        })
                    ) : (
                        <>
                            <Grid item xs={12} sx={{ mt: 3, mb: 7 }}>
                                <Typography align='center' paragraph={true} variant='h4'>
                                    No offers fulfill your conditions
                                </Typography>
                                <Typography align='center' variant='h5'>
                                    Look for something else!
                                </Typography>
                            </Grid>
                        </>
                    )}
                </Grid>
                <Box display='flex' justifyContent='center' sx={{ pb: 4 }}>
                    {totalPages && offers ? (
                        <Pagination
                            count={totalPages}
                            color='primary'
                            onChange={handlePaginationChange}
                            page={currentPage}
                        />
                    ) : (
                        <Skeleton variant='rectangular' />
                    )}
                </Box>
            </Container>
        </>
    );
};
