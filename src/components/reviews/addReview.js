import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stack, Rating, TextField, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { getValue } from '@testing-library/user-event/dist/utils';

export const AddReview = ( {reviewedUserNickname, reviewedUserId} ) => {

    const [error, setError] = useState('');
    const [score, setScore] = useState(0);
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
                setError(error.response.data);
            });
            
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
                                defaultValue={null}
                                rules={{ required: true }}
                                render={
                                    ({ field: {onChange, name, value, ref} }) => (
                                        <Rating precision={1} onChange={onChange} name={name} value={Number(value)} ref={ref} />
                                    )
                                }
                            >
                            </Controller>
                        </FormProvider>
                        <TextField label='Optional comment' {...methods.register('comment')} multiline fullWidth rows={2} sx={{mt: 1}}/>
                        <Typography color='error' variant='subtitle2' align='center'>
                            {error}
                        </Typography>
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
