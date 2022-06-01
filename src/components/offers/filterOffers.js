import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const FilterOffers = ({ categoryIdMain, changeCategoryIdMain, setSearchParams }) => {
    const [categories, setCategories] = useState([]);

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 250,
            },
        },
    };

    useEffect(() => {
        axios
            .get('api/Categories', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
                },
            })
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {});
    }, []);

    const handleCategoryChange = (event) => {
        setSearchParams({ category: event.target.value });
        changeCategoryIdMain(event.target.value);
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
                    value={categoryIdMain ? categoryIdMain : -1}
                    onChange={handleCategoryChange}
                >
                    <MenuItem value={-1}>None</MenuItem>
                    {categories.map((item) => {
                        return (
                            <MenuItem key={item.id} value={item.id}>
                                {item.categoryName}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};
