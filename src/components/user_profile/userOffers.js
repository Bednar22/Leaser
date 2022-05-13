import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utilities/auth';
import { Box, Grid } from '@mui/material';
import { SingleOffer } from './singleOffer';
import { Snackbar, Alert, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export const UserOffers = (props) => {
    const auth = useAuth();
    const [offers, setOffers] = useState([]);
    const [open, setOpen] = useState(false);

    const removeOffer = (index) => {
        let tempArr = offers;
        tempArr.splice(index, index);
        setOffers((prevOffer) => tempArr);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get(`/api/Posts/${auth.user.id}/User`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setOffers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item xs={10} md={8}>
                    {offers ? (
                        offers.map((item, index) => {
                            return (
                                <SingleOffer
                                    removeOffer={removeOffer}
                                    index={index}
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    pricePerWeek={item.pricePerWeek}
                                    pricePerMonth={item.pricePerMonth}
                                    availableTo={item.availableTo}
                                    handleClick={handleClick}
                                ></SingleOffer>
                            );
                        })
                    ) : (
                        <h1> No offers yet </h1>
                    )}
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                    Post deleted!
                </Alert>
            </Snackbar>
        </>
    );
};
