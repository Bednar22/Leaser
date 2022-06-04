import React, { useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { CategoriesTiles } from './categoriesTiles';
import { HomepageSearch } from './homepageSearch';
export const Homepage = ({ setSearch }) => {
    

    return (
        <>
            <Grid container spacing={4} justifyContent='center'>
                <Grid item xs={8}>
                    <HomepageSearch setSearch={setSearch}></HomepageSearch>
                </Grid>
                <Grid item xs={12}>
                    <CategoriesTiles></CategoriesTiles>
                </Grid>
            </Grid>
        </>
    );
};
