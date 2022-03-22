import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
export const Homepage = (props) => {
    const [testMessage, setTestMessage] = useState();

    const handleClick = () => {
        axios
            .get('/testowy')
            .then((res) => {
                setTestMessage(res.data);
                console.log('UDALO SIE');
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <h1>Homepage</h1>
            <h3>Przycisk prowadzi do /testowy, zapytanie GET</h3>
            <Button variant='outlined' onClick={handleClick}>
                Testowy przycisk do sprawdzenia polaczenia back front
            </Button>
            {testMessage ? testMessage : ''}
        </>
    );
};
