import { Card, CardHeader, CardContent, Typography, IconButton, Tooltip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant='outlined' onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Let Google help apps determine location. This means sending anonymous location data to Google,
                        even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export const SingleOffer = ({ id, title, description }) => {
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
            .delete(`/api/Posts/${16}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
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
                                {/* <Link href={herokuLink}> */}
                                <IconButton>
                                    <EditIcon sx={{ color: grey[900] }} />
                                </IconButton>
                                {/* </Link> */}
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
