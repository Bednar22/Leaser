import { useState, useEffect } from 'react';
import { useAuth } from '../utilities/auth';
import axios from 'axios';
import { SingleTransaction } from './singleTransaction';
import { Grid } from '@mui/material';

export const TransactionsMain = (props) => {
    const auth = useAuth();
    const token = window.localStorage.getItem('leaserToken');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/Transactions/${auth.user.id}/Payer`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setTransactions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item sm={12} md={8}>
                    {transactions.map((item) => {
                        return (
                            <SingleTransaction
                                payerId={item.payerId}
                                status={item.status}
                                price={item.price}
                                postId={item.postId}
                                dateFrom={item.dateFrom}
                                dateTo={item.dateTo}
                            ></SingleTransaction>
                        );
                    })}
                </Grid>
            </Grid>
        </>
    );
};
