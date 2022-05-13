import { Card, CardHeader, CardContent, Typography, IconButton, Tooltip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
}) => {
    const [open, setOpen] = useState(false);

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

    return (
        <>
            <Card sx={{ mb: 2, p: 2 }}>
                <CardHeader
                    title={title}
                    action={
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
                    }
                ></CardHeader>
                <CardContent>
                    <Typography>{description}</Typography>
                    <Typography>Price per day: {price}</Typography>
                    <Typography>Price per day: {pricePerWeek}</Typography>
                    <Typography>Price per day: {pricePerMonth}</Typography>
                    <Typography>Available to: {availableTo}</Typography>
                </CardContent>
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
