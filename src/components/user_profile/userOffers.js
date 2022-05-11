import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utilities/auth';
import { Box, Grid } from '@mui/material';
import { SingleOffer } from './singleOffer';
export const UserOffers = (props) => {
    const auth = useAuth();
    const [offers, setOffers] = useState([]);

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
                        <SingleOffer title={'Title'} description={'pies'}></SingleOffer>
                    ) : (
                        <h1> No offers yet </h1>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
