import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const FilterTransactions = ({ setFilterBy }) => {
    const [localFilterValue, setLocalFilterValue] = useState(0);

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 250,
            },
        },
    };

    const handleFilterChange = (e) => {
        setLocalFilterValue(e.target.value);
        switch (e.target.value) {
            case 0:
                setFilterBy('None');

                break;
            case 1:
                setFilterBy('Borrowed');

                break;
            case 2:
                setFilterBy('Returned');

                break;
            case 3:
                setFilterBy('Accepted');

                break;
            case 4:
                setFilterBy('Nonaccepted');

                break;
        }
    };

    return (
        <>
            <FormControl color='secondary' fullWidth size='small'>
                <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                <Select
                    MenuProps={MenuProps}
                    color='secondary'
                    fullWidth
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Status'
                    value={localFilterValue}
                    onChange={handleFilterChange}
                >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>Borrowed</MenuItem>
                    <MenuItem value={2}>Returned</MenuItem>
                    <MenuItem value={3}>Accepted</MenuItem>
                    <MenuItem value={4}>Not accepted</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};
