import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

export const FilterOffers = (props) => {
    const [anchorFilter, setAnchorFilter] = useState(null);
    const [filterBy, setFilterBy] = useState('location');
    const openFilter = Boolean(anchorFilter);

    const handleClickFilter = (event) => {
        setAnchorFilter(event.currentTarget);
    };

    const handleCloseFilter = () => {
        setAnchorFilter(null);
    };

    const handleFilter = (filter) => {
        setFilterBy(filter);
        setAnchorFilter(null);
    };

    return (
        <>
            <Button
                id='filter-button'
                variant='contained'
                color='secondary'
                aria-controls={openFilter ? 'filter-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openFilter ? 'true' : undefined}
                onClick={handleClickFilter}
            >
                Filter {filterBy}
            </Button>
            <Menu
                id='filter-menu'
                anchorEl={anchorFilter}
                open={openFilter}
                onClose={handleCloseFilter}
                MenuListProps={{
                    'aria-labelledby': 'filter-button',
                }}
            >
                <MenuItem onClick={() => handleFilter('date')}>Date</MenuItem>
            </Menu>
        </>
    );
};
