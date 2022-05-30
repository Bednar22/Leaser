import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export const AddPoints = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant='contained' color='secondary' onClick={handleClickOpen}>
                Add points
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add points to your account</DialogTitle>
                <DialogContent>
                    <DialogContentText>Choose ammount</DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Ammount'
                        type='email'
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleClose}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
