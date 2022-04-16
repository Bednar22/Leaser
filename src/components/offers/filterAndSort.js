import { useState } from 'react';
import { Grid, Typography, Button, Menu, MenuItem, Container, Stack } from '@mui/material';
export const FilterAndSort = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortBy, setSortBy] = useState('new');
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (sort) => {
        setSortBy(sort);
        setAnchorEl(null);
    };

    return (
        <>
            <Stack spacing={10} justifyContent='flex-start' direction='row'>
                <Button
                    id='basic-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Sort by {sortBy}
                </Button>
                <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleSort('date')}>Date</MenuItem>
                    <MenuItem onClick={() => handleSort('Price asc')}>Price asc</MenuItem>
                    <MenuItem onClick={() => handleSort('Price dsc')}>Price dsc</MenuItem>
                    <MenuItem onClick={() => handleSort('Best rating')}>Best rating</MenuItem>
                    {/* <MenuItem onClick={() => handleSort('rating_desc')}>Worst rating</MenuItem> */}
                </Menu>

                <Button
                    id='basic-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Sort by {sortBy}
                </Button>
                <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleSort('date')}>Date</MenuItem>
                    <MenuItem onClick={() => handleSort('Price asc')}>Price asc</MenuItem>
                    <MenuItem onClick={() => handleSort('Price dsc')}>Price dsc</MenuItem>
                    <MenuItem onClick={() => handleSort('Best rating')}>Best rating</MenuItem>
                    {/* <MenuItem onClick={() => handleSort('rating_desc')}>Worst rating</MenuItem> */}
                </Menu>
            </Stack>
        </>
    );
};
