import { AddPoints } from './addPoints';
import { Grid } from '@mui/material';
import { TransactionsMain } from './transactionsMain';
import { FilterTransactions } from './filterTransactions';
export const Wallet = (props) => {
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <AddPoints></AddPoints>
                </Grid>
                <Grid item xs={3}>
                    <FilterTransactions></FilterTransactions>
                </Grid>
                <Grid item xs={12}>
                    <TransactionsMain></TransactionsMain>
                </Grid>
            </Grid>
        </>
    );
};
