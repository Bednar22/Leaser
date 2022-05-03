import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stack, Rating, TextField, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import axios from 'axios';

export const AddReview = ( {reviewedUserNickname, reviewedUserId} ) => {

    const [error, setError] = useState('');
    const [score, setScore] = useState(0);
    const [score2, setScore2] = useState(0);
    const [comment, setComment] = useState(null);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     control
    // } = useForm();
    const methods = useForm();
    const navigate = useNavigate();

    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
        },
    };

    const handleReviewAdd = (data) => {

        data.ratedUserId = reviewedUserId;
        console.log(data);

        axios
            .post('/api/UserRates', data, config)
            .then((res) => {
                console.log(res);
                //props.handleClickSnackbar();
                //navigate('/home');
            })
            .catch((error) => {
                // console.log(error.response);
                setError('Something went wrong! Check form and try again!');
                // setError(error.response.data.title);
            });

        console.log(error);
    }

    return (
        <>
        <Container maxWidth='sm'>
            <Paper>
                <form onSubmit={methods.handleSubmit(handleReviewAdd)}>
                    <Stack sx={{p: 1}}>
                        <Typography variant='h5' fontWeight='bold'>
                            {reviewedUserNickname}
                        </Typography>
                        <Typography>
                            How would you rate this user?
                        </Typography>
                        <FormProvider {...methods}>
                            <Controller
                                name='rate'
                                rules={{ required: true }}
                                render={
                                    ({ field: {onChange} }) => (
                                        <Rating precision={1} onChange={onChange} />
                                    )
                                }
                                
                            >
                            </Controller>
                        </FormProvider>
                        <TextField label='Optional comment' {...methods.register('comment')} onChange={(e) => setComment(e.target.value)} multiline fullWidth rows={2} sx={{mt: 1}}/>
                        <Stack direction='row' justifyContent='flex-end' spacing={1} sx={{mt: 1}}>
                            <Button variant='outlined' color='secondary'>
                                Cancel
                            </Button>
                            <Button variant='contained' type='submit'>
                                Add review
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Container>
        </>
    )
}
