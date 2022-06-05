import { Grid, Container, Paper, Typography, Stack, Button, Box, TextField, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const TransactionSummary = () => {

    const params = useParams();
    const transactionId = params.id;

    const navigate = useNavigate();

    const [offerId, setOfferId] = useState(null);
    const [renterNickname, setRenterNickname] = useState(null);
    const [offerTitle, setOfferTitle] = useState(null);
    const [offerImage, setOfferImage] = useState(null);
    const [paidPrice, setPaidPrice] = useState(null);
    const [rentFrom, setRentFrom] = useState(null);
    const [rentTo, setRentTo] = useState(null);

    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
        },
    };

    const imageConfig = {
        responseType: 'blob', 
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`
        }
    };


    useEffect(() => {

        let offerIdLocal = null;

        axios
            .get(`/api/Transactions/${transactionId}`, config)
            .then( (res) => {
                offerIdLocal = res.data.postId;
                setOfferId(offerIdLocal);
                setPaidPrice(res.data.price);
                setRentFrom(new Date(res.data.dateFrom));
                setRentTo(new Date(res.data.dateTo));
            })
            .catch((error) => {
                console.log(error)
            });

        if (offerIdLocal != null) {
            axios
            .get(`/api/Posts/${offerId}`, config)
            .then( (res) => {
                setOfferTitle(res.data.title);
                setRenterNickname(res.data.userNickName);
            })
            .catch((error) => {
                console.log(error)
            });

            axios
            .get(`/api/Posts/${offerId}/Image`, imageConfig)
            .then( (res) => {
                setOfferImage(URL.createObjectURL(res.data))
            })
            .catch((error) => {
                console.log(error)
            });
        }
        
    }, [])


    return (
        <>
        <Paper>

        </Paper>
        </>
    );
}