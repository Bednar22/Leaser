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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const SingleOffer = ({
    id,
    index,
    title,
    description,
    handleClick,
    removeOffer,
    price,
    pricePerWeek,
    pricePerMonth,
    availableTo,
    currentUser,
}) => {
    const [open, setOpen] = useState(false);
    const [postImage, setPostImage] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletePost = () => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .delete(`/api/Posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                removeOffer(index);
                handleClick();
            })
            .catch((err) => {
                console.log(err);
            });
        setOpen(false);
    };

    useEffect(() => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get(`/api/Posts/${id}/Image`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setPostImage(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Card sx={{ mb: 3, p: 2 }}>
                <CardHeader
                    title={
                        <Link to={`/offers/offerDetails/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {title}
                        </Link>
                    }
                    action={
                        <>
                            {currentUser && (
                                <>
                                    <Tooltip title='Edit offer' disableInteractive sx={{ mr: 2 }}>
                                        <Link to={`/offer/editOffer/${id}`}>
                                            <IconButton>
                                                <EditIcon sx={{ color: grey[900] }} />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>

                                    <Tooltip title='Delete offer' disableInteractive>
                                        <IconButton onClick={handleClickOpen}>
                                            <DeleteIcon sx={{ color: grey[900] }} />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                        </>
                    }
                ></CardHeader>
                <Divider sx={{ mb: 2 }}></Divider>
                <Grid container direction='row'>
                    <Grid item xs={4}>
                        {postImage ? (
                            <CardMedia
                                component='img'
                                image={URL.createObjectURL(postImage)}
                                alt='offer image'
                            ></CardMedia>
                        ) : (
                            <Skeleton variant='rectangular' sx={{ height: 150 }}></Skeleton>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <CardContent>
                            <Box sx={{ ml: 4 }}>
                                <Typography variant='h6' sx={{ mb: 1 }}>
                                    Pricing:{' '}
                                </Typography>
                                <Stack direction='row'>
                                    <Box sx={{ mr: 3 }}>
                                        <Typography fontSize='large' align='center' color='secondary'>
                                            Day+{' '}
                                        </Typography>
                                        <Typography fontSize='large' align='center'>
                                            {price}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ml: 3, mr: 3 }}>
                                        <Typography fontSize='large' align='center' color='secondary'>
                                            Week+{' '}
                                        </Typography>
                                        <Typography fontSize='large' align='center'>
                                            {pricePerWeek}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ml: 3 }}>
                                        <Typography fontSize='large' align='center' color='secondary'>
                                            Month+{' '}
                                        </Typography>
                                        <Typography fontSize='large' align='center'>
                                            {pricePerMonth}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Typography sx={{ mt: 1 }} fontSize='large'>
                                    Available to: {availableTo.slice(0, 10)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{'Do you really want to delete this offer?'}</DialogTitle>
                {/* <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Let Google help apps determine location. This means sending anonymous location data to Google,
                        even when no apps are running.
                    </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Stack direction='row' justifyContent='space-between' sx={{ width: 1 / 1 }}>
                        <Button onClick={handleClose} autoFocus sx={{ ml: 4 }}>
                            Cancel
                        </Button>
                        <Button color='error' onClick={deletePost} sx={{ mr: 4 }}>
                            Delete
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
};
