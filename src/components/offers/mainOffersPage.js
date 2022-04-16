import { useState } from 'react';
import { Grid, Typography, Button, Menu, MenuItem, Container, Stack } from '@mui/material';
import { SearchComponent } from './searchComponent';
import { FilterAndSort } from './filterAndSort';
export const MainOffersPage = (props) => {
    
    
    return (
        <>
            <Container maxWidth='xl'>
                <Grid container justifyContent='space-between' direction='row' alignItems='center'>
                    <Grid item xs={6}>
                        <FilterAndSort />
                    </Grid>
                    <Grid item xs={3}>
                        <SearchComponent />
                    </Grid>
                </Grid>

                <Grid container>

                </Grid>
            </Container>
        </>
    );
};
