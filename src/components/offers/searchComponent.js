import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import SearchIcon from '@mui/icons-material/Search';

export const SearchComponent = (props) => {
    return (
        <>
            <FormControl sx={{ m: 1, width: 1 / 1 }} variant='outlined'>
                <OutlinedInput
                    color='secondary'
                    id='outlined-adornment-password'
                    type='text'
                    placeholder='Search...'
                    // onChange={}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='search-icon'
                                // onClick={}
                                edge='end'
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    );
};
