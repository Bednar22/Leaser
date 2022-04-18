import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import SearchIcon from '@mui/icons-material/Search';

export const SearchComponent = (props) => {
    return (
        <>
            <FormControl sx={{ m: 1, width: 1 / 1 }} variant='outlined'>
                {/* <InputLabel htmlFor='outlined-adornment-search'>Search...</InputLabel> */}
                <OutlinedInput
                    id='outlined-adornment-password'
                    type='text'
                    placeholder='Search...'
                    // value={}
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
