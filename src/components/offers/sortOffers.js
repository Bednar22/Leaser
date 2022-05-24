import { useState } from 'react';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const SortOffers = ({ sortByMain, changeSortByMain }) => {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 250,
            },
        },
    };

    const handleSort = (event) => {
        changeSortByMain(event.target.value);
    };

    return (
        <>
            <FormControl fullWidth size='small'>
                <InputLabel id='demo-simple-select-label'>Sort by</InputLabel>
                <Select
                    MenuProps={MenuProps}
                    color='secondary'
                    fullWidth
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Sort by'
                    onChange={handleSort}
                >
                    <MenuItem value='priceAsc'>Price ascending</MenuItem>
                    <MenuItem value='priceDsc'>Price descending</MenuItem>
                    <MenuItem value='ratingAsc'>Rating ascending</MenuItem>
                    <MenuItem value='ratingDsc'>Rating descending</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};
