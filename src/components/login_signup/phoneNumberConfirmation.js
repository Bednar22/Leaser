import { Grid, Paper, TextField, Typography, Button } from '@mui/material';

export const PhoneNumberConfiramtion = (props) => {
    return (
        <>
            <Paper sx={{ p: 4 }}>
                <Grid container justifyContent='center' justifyItems='center' spacing={{ xs: 2, sm: 2, md: 3 }}>
                    <Grid item sm={10} md={8}>
                        <Typography align='center' variant='h5'>
                            What is your phone number?
                        </Typography>
                    </Grid>
                    <Grid item sm={10} md={8}>
                        <Typography align='center'>
                            In order to secure your new Leaser account we need to verify your phone number
                        </Typography>
                    </Grid>
                    <Grid item sm={10} md={8}>
                        <TextField fullWidth label='' type='tel' size='small'></TextField>
                    </Grid>
                    <Grid item sm={10} md={8}>
                        <Button variant='contained' sx={{ width: 1 / 1 }}>
                            Send verification code
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};
