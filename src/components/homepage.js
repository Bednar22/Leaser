import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
export const Homepage = (props) => {
    const [testMessage, setTestMessage] = useState();

    const handleClick = () => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get('/api/Accounts/User', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setTestMessage(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <>
            <h1>Homepage</h1>
            <h3>Przycisk prowadzi do /api/Accounts --- sprawdz wynik w konsoli(ctrl+shift+i)</h3>
            <Button variant='outlined' onClick={handleClick}>
                Testowy przycisk do sprawdzenia polaczenia back front
            </Button>
        </>
    );
};
