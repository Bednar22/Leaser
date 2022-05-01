import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stack, Rating, TextField, Container, Button } from '@mui/material';
import axios from 'axios';

export const AddReview = (props) => {

    const [error, setError] = useState('');
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
        },
    };

    const addReview = (e) => {

    }

    return (
        <>
        <Container maxWidth='sm'>
            <Paper>
                <Stack sx={{p: 1}}>
                    <Typography variant='h6' fontWeight='bold'>
                        How would you rate this user?
                    </Typography>
                    <Rating size='large' precision={0.1} />
                    <TextField label='Optional comment' multiline fullWidth rows={2} sx={{mt: 1}}/>
                    <Stack direction='row' justifyContent='flex-start' spacing={1} sx={{mt: 1}}>
                        <Button variant='contained'>
                            Add review
                        </Button>
                        <Button variant='text' >
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
        </>
    )
}
