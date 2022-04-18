import React, { useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { CategoriesTiles } from './categoriesTiles';
export const Homepage = (props) => {
    return (
        <>
            <Grid container spacing={4} justifyContent='center'>
                <Grid item xs={10}>
                    <h2>To bedzie strona startowa zalogowanego uzytkownika, pomyslmy co jeszcze na niej dodać</h2>
                </Grid>
                <CategoriesTiles></CategoriesTiles>
            </Grid>
        </>
    );
};
