import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import { useAuth } from '../utilities/auth';
import axios from 'axios';

export const AddPoints = (props) => {
    const [open, setOpen] = useState(false);
    const [pointsAmmount, setpointsAmmount] = useState(10);
    const auth = useAuth();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        const token = window.localStorage.getItem('leaserToken');
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .put(`/api/Accounts/${auth.user.id}/AddPoints`, pointsAmmount, config)
            .then((res) => {
                console.log(res.data);
                handleClose();
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <>
            <Button variant='contained' color='secondary' onClick={handleClickOpen}>
                Add points
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
                <DialogTitle>Choose ammount</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='points'
                        label='Ammount'
                        type='number'
                        fullWidth
                        variant='standard'
                        onChange={(e) => setpointsAmmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Stack direction='row' justifyContent='space-between' sx={{ width: 1 / 1, mx: 2, mb: 2 }}>
                        <Button variant='outlined' onClick={handleClose} color='secondary'>
                            Cancel
                        </Button>
                        <Button variant='outlined' onClick={handleConfirm}>
                            Add points
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
};
