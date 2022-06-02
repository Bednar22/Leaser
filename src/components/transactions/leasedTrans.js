import { useState, useEffect } from 'react';
import { SingleTransaction } from './singleTransaction';
import { Grid, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../utilities/auth';
import { FilterTransactions } from './filterTransactions';
import { GridBreak } from '../utilities/gridBreak';

export const LeasedTrans = (props) => {
    const auth = useAuth();
    const token = window.localStorage.getItem('leaserToken');
    const [transactions, setTransactions] = useState([]);
    const [filterBy, setFilterBy] = useState('None');

    const filterAll = (element, index, array) => {
        if (filterBy == 'None') {
            return element;
        } else {
            return element.status == filterBy;
        }
    };

    const getTransactions = () => {
        axios
            .get(`/api/Transactions/${auth.user.id}/User`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                let filteredArr = res.data.filter((element, index, array) => {
                    return element.payerId != auth.user.id;
                });
                setTransactions(filteredArr);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <>
            <Grid container justifyContent='flex-start' sx={{ my: 2 }}>
                <Grid item sm={1}></Grid>
                <Grid item sm={3}>
                    <FilterTransactions setFilterBy={setFilterBy}></FilterTransactions>
                </Grid>
                <GridBreak></GridBreak>
            </Grid>

            <Grid container justifyContent='center'>
                <Grid item sm={12} md={10}>
                    {transactions.filter(filterAll).map((item) => {
                        return (
                            <SingleTransaction
                                payerId={item.payerId}
                                status={item.status}
                                price={item.price}
                                postId={item.postId}
                                dateFrom={item.dateFrom}
                                dateTo={item.dateTo}
                                leaser={true}
                                transId={item.id}
                                getTransactions={getTransactions}
                            ></SingleTransaction>
                        );
                    })}
                </Grid>
            </Grid>
        </>
    );
};
