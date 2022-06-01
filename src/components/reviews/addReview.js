import React, { useState } from 'react';
import { Paper, Typography, Stack, Rating, TextField, Container, Button } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

export const AddReview = ({ reviewedUserNickname, reviewedUserId, setAddedReview }) => {
    const [error, setError] = useState('');
    const [score, setScore] = useState(null);
    const [comment, setComment] = useState('');

    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
        },
    };

    const handleReviewAdding = () => {
        let data = {};
        let scoreFilled = false;
        data.ratedUserId = reviewedUserId;

        if (score != null) {
            if (score !== 0) {
                scoreFilled = true;
                data.rate = score;
            }
        }

        if (comment != null) {
            if (comment !== '') {
                data.comment = comment;
            }
        }

        if (scoreFilled) {
            axios
                .post('/api/UserRates', data, config)
                .then((res) => {
                    // console.log(res);
                    setAddedReview(true);
                    setError('');
                })
                .catch((error) => {
                    setError(error.response.data);
                });
        } else {
            setError('Rating from 1 to 5 is required to add a review.');
        }
    };

    return (
        <>
            <Container sx={{ mb: 3 }}>
                <Paper>
                    <Stack sx={{ p: 2 }}>
                        <Typography variant='h5' fontWeight='bold' sx={{ mb: 1 }}>
                            {reviewedUserNickname}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>How would you rate this user?</Typography>
                        <Rating
                            precision={1}
                            sx={{ mb: 1 }}
                            size='large'
                            onChange={(e) => setScore(e.target.value)}
                            value={Number(score)}
                        />
                        <TextField
                            label='Optional comment'
                            onChange={(e) => setComment(e.target.value)}
                            multiline
                            fullWidth
                            rows={4}
                            sx={{ mt: 1 }}
                        />
                        <Typography sx={{ mt: 1 }} color='error' variant='subtitle2' align='center'>
                            {error}
                        </Typography>
                        <Stack direction='row' justifyContent='flex-end' spacing={1} sx={{ mt: 1 }}>
                            <Button variant='outlined' color='secondary'>
                                Cancel
                            </Button>
                            <Button variant='contained' onClick={handleReviewAdding}>
                                Add review
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};
