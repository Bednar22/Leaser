import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper, Stack, Card, CardHeader, CardContent, CardMedia, Typography } from '@mui/material';
import { useAuth } from '../utilities/auth';
import axios from 'axios';

import AddIcon from '@mui/icons-material/Add';

export const AddPoints = (props) => {
    const [open, setOpen] = useState(false);
    const [pointsAmmount, setpointsAmmount] = useState(0);
    const [points, setPoints] = useState();
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
                getUserPoints();
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    const getUserPoints = () => {
        const token = window.localStorage.getItem('leaserToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get(`/api/Accounts/User`, config)
            .then((res) => {
                console.log(res.data);
                setPoints(res.data.points);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    useEffect(() => {
        getUserPoints();
    }, []);

    return (
        <>
            <Card sx={{ px: 4, py: 3, mb: 4 }}>
                <CardHeader
                    title={`Account balance: ${points} points`}
                    action={
                        <Button
                            endIcon={<AddIcon></AddIcon>}
                            variant='contained'
                            color='secondary'
                            onClick={handleClickOpen}
                        >
                            Add points
                        </Button>
                    }
                ></CardHeader>
                
            </Card>
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
