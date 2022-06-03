import { IconButton, Alert, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const TransactionsAlerts = ({ alertType, snackBar, setSnackBar }) => {
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBar(false);
    };

    const action = (
        <>
            <IconButton size='small' aria-label='close' color='inherit' onClick={handleCloseSnackbar}>
                <CloseIcon fontSize='small' />
            </IconButton>
        </>
    );

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackBar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                action={action}
                key={'bottomright'}
            >
                <Alert onClose={handleCloseSnackbar} severity='info' sx={{ width: '100%' }}>
                    {alertType === 'report' && 'Issue reported, thank you! We will contact you soon!'}
                    {alertType === 'return' && 'Item returned! Wait for the owner opinion, status should change soon!'}
                    {alertType === 'accepted' && 'No problems! You accepted the state of returned item!'}
                </Alert>
            </Snackbar>
        </>
    );
};
