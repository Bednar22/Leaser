import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const FilterTransactions = (props) => {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 250,
            },
        },
    };

    return (
        <>
            <FormControl color='secondary' fullWidth size='small'>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                    MenuProps={MenuProps}
                    color='secondary'
                    fullWidth
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Category'
                    // value={categoryIdMain ? categoryIdMain : -1}
                    // onChange={handleCategoryChange}
                >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>My rents</MenuItem>
                    <MenuItem value={2}>Rented from me</MenuItem>
                    <MenuItem value={3}>Accepted</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};
