import { useState } from 'react';
import {
    TextField,
    Button,
    Stack,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import '../../App.css';

export const PasswordConfirm = ({ open, handleClose, onSubmit, password, setPassword }) => {
    const [passError, setPassError] = useState(false);

    const confirmClick = () => {
        if (password) {
            onSubmit();
        } else {
            setPassError(true);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm password to edit profile data</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='password'
                        label='Password'
                        type='password'
                        fullWidth
                        variant='standard'
                        error={passError ? true : false}
                        helperText={passError ? 'Input your password' : null}
                        onFocus={() => setPassError(false)}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Stack direction='row' justifyContent='space-between' sx={{ width: 1 / 1 }}>
                        <Button color='secondary' onClick={handleClose} autoFocus sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                        <Button onClick={() => confirmClick()} sx={{ mr: 2 }}>
                            Confirm
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
};
