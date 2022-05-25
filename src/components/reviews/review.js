import { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Stack, Rating } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const Review = ({ author, comment, score }) => {
    const [rater, setRater] = useState('');
    useEffect(() => {
        const token = window.localStorage.getItem('leaserToken');
        if (author) {
            axios
                .get(`/api/Accounts/${author}/User`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setRater(res.data.nickName);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [author]);

    return (
        <>
            {rater && score && comment ? (
                <Paper>
                    <Stack sx={{ p: 1 }}>
                        <Typography fontWeight='bold' variant='h6'>
                            {rater}
                        </Typography>
                        {<Rating readOnly precision={0.1} value={score} />}
                        <Typography sx={{ pt: 1 }}>{comment}</Typography>
                    </Stack>
                </Paper>
            ) : (
                <Skeleton variant='rectangular' height={100}></Skeleton>
            )}
        </>
    );
};
