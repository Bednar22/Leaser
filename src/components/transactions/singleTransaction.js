import { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Tooltip,
    Stack,
    Box,
    Grid,
    Divider,
    Skeleton,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SellIcon from '@mui/icons-material/Sell';
import '../../App.css';

export const SingleTransaction = ({ postId, payerId, dateFrom, dateTo, price, status }) => {
    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get(`/api/Posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setPostInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Card sx={{ my: 3, p: 2 }}>
                <CardHeader
                    title={
                        <Link
                            to={`/offers/offerDetails/${postId}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {postInfo.title}
                        </Link>
                    }
                ></CardHeader>
                <Divider sx={{ mb: 2 }}></Divider>
                <Grid container direction='row'>
                    <CardContent>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Stack direction='row' spacing={2}>
                                <EastIcon></EastIcon> <Typography>Pies</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Stack direction='row' spacing={2}>
                                <WestIcon></WestIcon>
                                <Typography>Pies</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Stack direction='row' spacing={2}>
                                <DateRangeIcon></DateRangeIcon>
                                <Typography>
                                    Date range: {dateFrom.slice(0, 10)} - {dateTo.slice(0, 10)}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Stack direction='row' spacing={2}>
                                <SellIcon></SellIcon>
                                <Typography>{price} points</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Stack direction='row' spacing={2}>
                                <BubbleChartIcon></BubbleChartIcon>
                                <Typography>{status}</Typography>
                            </Stack>
                        </Grid>
                    </CardContent>
                </Grid>
            </Card>
        </>
    );
};
