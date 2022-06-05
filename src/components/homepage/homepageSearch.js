import React, { useState } from 'react';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export const HomepageSearch = ({ setSearch }) => {
    const navigate = useNavigate();
    const [localSearch, setLocalSearch] = useState(null);

    const handleSearchClick = () => {
        setSearch(localSearch);
        navigate(`/offers`);
    };

    return (
        <>
            <Typography sx={{ m: 1 }} fontSize={16} variant='overline'>
                Tell us what you are looking for...
            </Typography>
            <FormControl sx={{ m: 1, width: 1 / 1 }} variant='outlined'>
                <OutlinedInput
                    color='secondary'
                    id='homepage-search'
                    type='text'
                    placeholder='Search...'
                    onChange={(e) => {
                        setLocalSearch(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton aria-label='search-icon' onClick={() => handleSearchClick()} edge='end'>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    );
};
