import React, { useState, useEffect } from 'react';
import { Paper, TextField, Grid, Container, Button, Typography, Stack, Box } from '@mui/material';
import { GridBreak } from '../utilities/gridBreak';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import '../../App.css';
import { InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const validationSchema = yup.object().shape({
    //maybe schema
});

export const AddOffer = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <Container maxWidth='lg'>
                <Paper sx={{ p: 2, mb: 6 }}>
                    <form onSubmit={() => alert('Submit')}>
                        <Box sx={{ width: 12 / 25, mb: 2, p: 1, display: 'inline-block' }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} direction='row' alignItems='flex-start'>
                                <Grid item xs={12} md={12}>
                                    <TextField required label='Item' size='small' type='text' fullWidth></TextField>
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
                                    ></TextField>
                                </Grid>

                                <GridBreak />
                                <Grid item xs={4} md={6}>
                                    <TextField
                                        required
                                        label='Price per day'
                                        type='text'
                                        size='small'
                                        fullWidth
                                    ></TextField>
                                </Grid>

                                <Grid item xs={4} md={6}>
                                    <TextField
                                        required
                                        label='Price per week'
                                        type='text'
                                        size='small'
                                        fullWidth
                                    ></TextField>
                                </Grid>

                                <Grid item xs={4} md={6}>
                                    <TextField
                                        required
                                        label='Price per month'
                                        type='text'
                                        size='small'
                                        fullWidth
                                    ></TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        // required
                                        label='Deposit'
                                        type='text'
                                        size='small'
                                        fullWidth
                                    ></TextField>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ width: 12 / 25, ml: 1, mb: 2, display: 'inline-block' }}>
                            <Grid container spacing={2} direction='row' justifyContent='center' alignItems='flex-start'>
                                <Grid item xs={4}>
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
                                <Grid item xs={10}>
                                    <Stack direction='row' spacing={3} justifyContent='space-between'>
                                        <Button
                                            sx={{ width: 1 / 3 }}
                                            variant='contained'
                                            component='label'
                                            onChange={(event) => {
                                                console.log(event.target.files[0]);
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
