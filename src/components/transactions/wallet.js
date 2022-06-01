import { AddPoints } from './addPoints';
import { Grid } from '@mui/material';
import { TransactionsMain } from './transactionsMain';
export const Wallet = (props) => {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <AddPoints></AddPoints>
                </Grid>
                <Grid item xs={12}>
                    <TransactionsMain></TransactionsMain>
                </Grid>
            </Grid>
        </>
    );
};
