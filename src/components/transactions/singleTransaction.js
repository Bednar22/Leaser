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
    CardActions,
} from '@mui/material';
// import { grey } from '@mui/material/colors';
import axios from 'axios';
import { Link } from 'react-router-dom';
//icons
import DateRangeIcon from '@mui/icons-material/DateRange';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SellIcon from '@mui/icons-material/Sell';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import '../../App.css';
import Close from '@mui/icons-material/Close';
import { useAuth } from '../utilities/auth';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { GridBreak } from '../utilities/gridBreak';

export const SingleTransaction = ({ postId, payerId, dateFrom, dateTo, price, status, leaser, transId }) => {
    const [postInfo, setPostInfo] = useState({});
    const token = window.localStorage.getItem('leaserToken');

    const cancelAccept = () => {
        axios
            .post(`/api/Transactions/${transId}/Accept`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log('Item returned');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const returnItem = () => {
        axios
            .post(
                `/api/Transactions/${transId}/Return`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log('Item returned');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
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
                    // action={
                    //     <>
                    //         {Date.now() && (
                    //             <Tooltip title='You should return item soon' disableInteractive>
                    //                 <PriorityHighIcon color='warning'></PriorityHighIcon>
                    //             </Tooltip>
                    //         )}
                    //     </>
                    // }
                ></CardHeader>
                <Divider sx={{ mb: 2 }}></Divider>

                <CardContent>
                    <Grid container direction='row'>
                        {leaser == true ? (
                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <Stack direction='row' spacing={2}>
                                    <PersonIcon></PersonIcon>
                                    <Typography>
                                        Leaser:{' '}
                                        <Link
                                            to={`/user/profile/${postInfo.userId}`}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {postInfo.userNickName}
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Grid>
                        ) : (
                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <Stack direction='row' spacing={2}>
                                    <PersonIcon></PersonIcon>
                                    <Typography>Borrower: {}</Typography>
                                </Stack>
                            </Grid>
                        )}

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
                                <Typography>Price: {price} points</Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Stack direction='row' spacing={2}>
                                <AssignmentReturnIcon></AssignmentReturnIcon>
                                <Typography>Deposit: {[postInfo.depositValue]} points</Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Stack direction='row' spacing={2}>
                                <BubbleChartIcon></BubbleChartIcon>
                                <Typography>Status: {status}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>

                <CardActions>
                    <>
                        {status == 'Borrowed' ? (
                            <>
                                <Stack
                                    sx={{ width: 1 / 1 }}
                                    k
                                    direction='row'
                                    spacing={2}
                                    justifyContent='flex-end'
                                    alignItems='center'
                                >
                                    <Button
                                        onClick={() => returnItem()}
                                        variant='outlined'
                                        startIcon={<RotateRightIcon></RotateRightIcon>}
                                    >
                                        Return this item
                                    </Button>
                                </Stack>
                            </>
                        ) : null}
                    </>
                </CardActions>
            </Card>
        </>
    );
};

{
    /* <Typography>Do you accept return?</Typography>
                        <Button variant='outlined' color='error' startIcon={<CloseIcon></CloseIcon>}>
                            Cancel
                        </Button>

                        <Button
                            onClick={() => returnItem()}
                            variant='outlined'
                            color='success'
                            startIcon={<CheckIcon></CheckIcon>}
                        >
                            Return
                        </Button> */
}
