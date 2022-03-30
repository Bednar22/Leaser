import React from 'react';
import { Paper, TextField, Grid, Container, Button, Typography, Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { GridBreak } from './gridBreak';
export const SignUp = (props) => {
    return (
        <>
            <Container maxWidth='md'>
                <Paper sx={{ p: 3 }}>
                    <Box>
                        <Grid container alignItems='center' justifyContent='center' spacing={{ xs: 2, md: 3 }}>
                            <GridBreak />
                            <Grid item sm={12} md={4}>
                                <Typography variant='h5'>Dołącz do Leasera!</Typography>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField label='E-mail' size='small' fullWidth></TextField>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField label='Hasło' type='password' size='small' fullWidth></TextField>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <TextField label='Potwierdź hasło' type='password' size='small' fullWidth></TextField>
                            </Grid>
                            <GridBreak />
                            <GridBreak />
                            <Grid item xs={12} md={6}>
                                <Stack direction='row' spacing={2}>
                                    <TextField label='Imię' size='small'></TextField>
                                    <TextField label='Nazwisko' size='small'></TextField>
                                </Stack>
                            </Grid>
                            <GridBreak />

                            <Grid item xs={8} md={4}>
                                <Button variant='contained' sx={{ width: 1 / 1 }}>
                                    Zarejestruj
                                </Button>
                            </Grid>
                            <GridBreak />
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};
