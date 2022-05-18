import { useState } from 'react';
import { TextField, Typography, Button, Stack, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../../App.css';

export const PhoneNumberConfiramtion = ({ open, handleClose, confirmClick }) => {
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState(false);
    const handleConfirm = () => {
        if (code) {
            confirmClick();
        } else {
            setCodeError(true);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Phone number confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We store phone number to make transactions safer. Enter code that was sent to you below
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='code'
                        label='Code'
                        type='number'
                        fullWidth
                        variant='standard'
                        error={codeError ? true : false}
                        helperText={codeError ? 'Enter the code that was sent to your phone number' : null}
                        onBlur={(e) => setCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Stack direction='row' justifyContent='space-between' sx={{ width: 1 / 1 }}>
                        <Button color='secondary' onClick={handleClose} autoFocus sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} sx={{ mr: 2 }}>
                            Confirm
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
};
