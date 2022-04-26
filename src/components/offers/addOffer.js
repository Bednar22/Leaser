import React, { useState, useEffect } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography, Stack, Box } from '@mui/material';
import { GridBreak } from '../utilities/gridBreak';
import axios from 'axios';
import '../../App.css';
import { InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Input = styled('input')({
    display: 'none',
});

export const AddOffer = (props) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [pricePerWeek, setPricePerWeek] = useState('');
    const [pricePerMonth, setPricePerMonth] = useState('');
    const [deposit, setDeposit] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [availableTo, setAvailableTo] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const smallSize = useMediaQuery('(max-width:900px)');

    const addOffer = (e) => {
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('pricePerDay', pricePerDay);
        formData.append('pricePerWeek', pricePerWeek);
        formData.append('pricePerMonth', pricePerMonth);
        formData.append('depositId', '');
        formData.append('availableFrom', availableFrom.toISOString());
        formData.append('availableTo', availableTo.toISOString());
        formData.append('postImage', selectedImage);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
            },
        };
        const categoryId = 1;

        axios
            .post(`/api/Posts/${categoryId}`, formData, config)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.response);
            });

        e.preventDefault();
    };

    return (
        <>
            <Container maxWidth='lg'>
                <Paper sx={{ p: 2, mb: 6 }}>
                    <form onSubmit={(e) => addOffer(e)}>
                        <Box
                            sx={
                                smallSize
                                    ? { width: 1 / 1, mb: 2, p: 1 }
                                    : { width: 12 / 25, mb: 2, p: 1, display: 'inline-block' }
                            }
                        >
                            <Grid container spacing={{ xs: 2, md: 3 }} direction='row' alignItems='flex-start'>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        required
                                        label='Title'
                                        size='small'
                                        type='text'
                                        fullWidth
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        multiline
                                        rows={6}
                                        required
                                        label='Description'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></TextField>
                                </Grid>

                                <GridBreak />
                                <Grid item xs={6} md={6}>
                                    <TextField
                                        required
                                        label='Price per day'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        value={pricePerDay}
                                        onChange={(e) => setPricePerDay(e.target.value)}
                                    ></TextField>
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        required
                                        label='Price per week'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        value={pricePerWeek}
                                        onChange={(e) => setPricePerWeek(e.target.value)}
                                    ></TextField>
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        required
                                        label='Price per month'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        value={pricePerMonth}
                                        onChange={(e) => setPricePerMonth(e.target.value)}
                                    ></TextField>
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        label='Deposit'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        value={deposit}
                                        onChange={(e) => setDeposit(e.target.value)}
                                    ></TextField>
                                </Grid>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid item xs={6}>
                                        <DatePicker
                                            // inputFormat='dd.mm.yyyy'
                                            label='Available from'
                                            value={availableFrom}
                                            onChange={(newValue) => {
                                                setAvailableFrom(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            minDate={Date.now()}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <DatePicker
                                            // inputFormat='dd.mm.yyyy'
                                            label='Available to'
                                            value={availableTo}
                                            onChange={(newValue) => {
                                                setAvailableTo(newValue);
                                            }}
                                            minDate={availableFrom}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                </LocalizationProvider>
                            </Grid>
                        </Box>
                        <Box
                            sx={
                                smallSize
                                    ? { width: 1 / 1, mb: 2, p: 1 }
                                    : { width: 12 / 25, mb: 2, p: 1, display: 'inline-block' }
                            }
                        >
                            <Grid container spacing={2} direction='row' justifyContent='center' alignItems='flex-start'>
                                <Grid item xs={8}>
                                    <Typography align='center' variant='subtitle1'>
                                        UPLOAD AN IMAGE
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {selectedImage ? (
                                        <Box>
                                            <img
                                                alt='not fount'
                                                className='offer-image'
                                                src={URL.createObjectURL(selectedImage)}
                                            />
                                        </Box>
                                    ) : (
                                        <Paper sx={{ height: 250, mb: 0 }}></Paper>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <Stack direction='row' spacing={3} justifyContent='space-between'>
                                        <Button
                                            sx={{ width: 1 / 3 }}
                                            variant='contained'
                                            component='label'
                                            onChange={(event) => {
                                                setSelectedImage(event.target.files[0]);
                                            }}
                                        >
                                            Upload File
                                            <input accept='image/*' type='file' hidden />
                                        </Button>
                                        {selectedImage && (
                                            <Button
                                                sx={{ width: 1 / 3 }}
                                                variant='contained'
                                                onClick={() => setSelectedImage(null)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ width: 1 / 3, mx: 'auto', mt: 4 }}>
                            <Button variant='contained' type='submit' fullWidth>
                                Add new item
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </>
    );
};
