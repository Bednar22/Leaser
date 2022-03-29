import React from 'react';
import { Paper, TextField, Grid, Container, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export const SignUp = (props) => {
    return (
        <>
            <Container sx={{ width: 3 / 4 }}>
                <Paper sx={{ p: 4 }}>
                    <Grid container direction='column' justifyContent='center' alignItems='center' spacing={4}>
                        <Grid item sm={6} md={6}>
                            <TextField label='Nazwa użytkownika'></TextField>
                        </Grid>
                        <Grid item sm={8} md={4}>
                            <TextField label='E-mail'></TextField>
                        </Grid>

                        <Grid item sm={8} md={4}>
                            <Button variant='contained'>Zarejestruj</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};
