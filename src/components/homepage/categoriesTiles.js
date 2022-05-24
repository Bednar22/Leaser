import { ImageList, ImageListItem, ImageListItemBar, Grid } from '@mui/material';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CategoriesTiles = (props) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const cateogoryClick = (category) => {
        navigate(`/offers/${category}`);
    };

    const tile_size = 244;

    useEffect(() => {
        axios
            .get('/api/Categories', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setCategories(res.data);
            })
            .catch((err) => {});
    }, []);

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item xs={12} md={8}>
                    <ImageList cols={4}>
                        {categories.map((item) => (
                            <ImageListItem
                                key={item.id}
                                onClick={() => cateogoryClick(item.categoryName)}
                                className='category-tile'
                            >
                                <img
                                    src={`${item.imageURL}?w=${tile_size}&h=${tile_size}&fit=crop&auto=format`}
                                    // srcSet={`${item.imageURL}?w=${tile_size}&h=${tile_size}&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.categoryName}
                                    loading='lazy'
                                />
                                <ImageListItemBar title={item.categoryName} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </>
    );
};
