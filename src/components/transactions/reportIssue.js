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
    Divider,
    Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import '../../App.css';

export const ReportIssue = ({ open, handleClose, confirmClick }) => {
    const [text, setText] = useState('');

    const handleConfirm = () => {
        confirmClick();
        handleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
                <DialogTitle sx={{ pt: 4, mb: 2 }}>
                    Report the issue <Divider></Divider>
                </DialogTitle>

                <DialogContent sx={{ p: 4 }}>
                    <DialogContentText sx={{ mb: 1 }}>
                        <Typography>
                            Your report will be sent to our issue department and we will contact your if need, describe
                            your problem below.
                        </Typography>
                        <Typography>More contact info: </Typography>
                        <Stack direction='row' spacing={1}>
                            <EmailIcon></EmailIcon>
                            <Typography>leaser.help@gmail.com</Typography>
                        </Stack>
                        <Stack direction='row' spacing={1}>
                            <PhoneIcon></PhoneIcon>
                            <Typography>+48123456789</Typography>
                        </Stack>
                    </DialogContentText>
                    <TextField
                        multiline={true}
                        rows={5}
                        autoFocus
                        margin='dense'
                        id='issue'
                        // label='Issue'
                        placeholder='Describe your issue...'
                        type='text'
                        fullWidth
                        variant='outlined'
                    />
                </DialogContent>
                <DialogActions sx={{ pb: 4 }}>
                    <Stack direction='row' justifyContent='space-between' sx={{ width: 1 / 1 }}>
                        <Button color='secondary' onClick={handleClose} variant='outlined' autoFocus sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} color='error' variant='outlined' sx={{ mr: 2 }}>
                            Report
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
};
