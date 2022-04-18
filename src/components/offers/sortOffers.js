import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

export const SortOffers = (props) => {
    const [anchorSort, setAnchorSort] = useState(null);
    const [sortBy, setSortBy] = useState('new');
    const openSort = Boolean(anchorSort);

    const handleClickSort = (event) => {
        setAnchorSort(event.currentTarget);
    };

    const handleCloseSort = () => {
        setAnchorSort(null);
    };

    const handleSort = (sort) => {
        setSortBy(sort);
        setAnchorSort(null);
    };

    return (
        <>
            <Button
                id='sortby-button'
                aria-controls={openSort ? 'sortby-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openSort ? 'true' : undefined}
                onClick={handleClickSort}
            >
                Sort by {sortBy}
            </Button>
            <Menu
                id='sortby-menu'
                anchorEl={anchorSort}
                open={openSort}
                onClose={handleCloseSort}
                MenuListProps={{
                    'aria-labelledby': 'sortby-button',
                }}
            >
                <MenuItem onClick={() => handleSort('date')}>Date</MenuItem>
                <MenuItem onClick={() => handleSort('Price asc')}>Price asc</MenuItem>
                <MenuItem onClick={() => handleSort('Price dsc')}>Price dsc</MenuItem>
                <MenuItem onClick={() => handleSort('Best rating')}>Best rating</MenuItem>
                {/* <MenuItem onClick={() => handleSort('rating_desc')}>Worst rating</MenuItem> */}
            </Menu>
        </>
    );
};
