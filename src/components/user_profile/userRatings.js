import { useEffect, useState } from 'react';
import { ReviewList } from '../reviews/reviewList';
import { Box, Divider, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAuth } from '../utilities/auth';
import { AddReview } from '../reviews/addReview';
import axios from 'axios';

export const UserRatings = (props) => {
    const [reviews, setReviews] = useState([]);
    const [addedReview, setAddedReview] = useState(false);
    const auth = useAuth();
    const params = useParams();
    useEffect(() => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get(`/api/UserRates/UserRated/${params.id}`, {
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
    }, [params, addedReview]);

    return (
        <>
            <Box sx={{ width: 1 / 1 }}>
                <Grid container justifyContent='center'>
                    {auth.user.id !== params.id ? (
                        <Grid item xs={12} md={8}>
                            <AddReview reviewedUserId={params.id} setAddedReview={setAddedReview}></AddReview>
                            <Divider sx={{ mb: 2 }}></Divider>
                        </Grid>
                    ) : null}
                    <Grid item xs={12} md={8}>
                        {reviews.length != 0 ? (
                            <ReviewList reviews={reviews}></ReviewList>
                        ) : (
                            <Typography sx={{ mt: 5 }} align='center' fontSize='large'>
                                No reviews yet
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
