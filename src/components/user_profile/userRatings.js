import { useEffect, useState } from 'react';
import { ReviewList } from '../reviews/reviewList';
import axios from 'axios';
import { useAuth } from '../utilities/auth';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material';

export const UserRatings = (props) => {
    const [reviews, setReviews] = useState([{}]);
    const auth = useAuth();
    useEffect(() => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get(`/api/UserRates/UserRated/${auth.user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setReviews(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Box sx={{ width: 1 / 1 }}>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} md={8}>
                        {reviews ? (
                            <ReviewList reviews={reviews}></ReviewList>
                        ) : (
                            <Typography> No reviews yet</Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
