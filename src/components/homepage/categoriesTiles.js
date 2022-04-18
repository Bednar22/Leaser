import { ImageList, ImageListItem, ImageListItemBar, Button, Grid } from '@mui/material';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
const categories = [
    {
        img: 'https://images.unsplash.com/photo-1542060748-10c28b62716f',
        title: 'Clothes',
    },
    {
        img: 'https://images.unsplash.com/photo-1512412046876-f386342eddb3',
        title: 'Sports',
    },
    {
        img: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac',
        title: 'Cameras',
    },
    {
        img: 'https://images.unsplash.com/photo-1563090728-6f7cdbfb4d72',
        title: 'Tools',
    },
    {
        img: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde',
        title: 'Medicine',
    },
    {
        img: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60',
        title: 'Drones',
    },
    {
        img: 'https://images.unsplash.com/photo-1621460248083-6271cc4437a8',
        title: 'Garden',
    },
    {
        img: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923',
        title: 'Electronic',
    },
    {
        img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7',
        title: 'Toys',
    },
    {
        img: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015',
        title: 'Games',
    },
    {
        img: 'https://images.unsplash.com/photo-1570102881689-c04ab4cf1f4c',
        title: 'Parties',
    },
    {
        img: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890',
        title: 'Bikes',
    },
];

export const CategoriesTiles = (props) => {
    const navigate = useNavigate();

    const cateogoryClick = (category) => {
        navigate(`/offers/${category}`);
    };

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item xs={12} md={8}>
                    <ImageList cols={4}>
                        {categories.map((item) => (
                            <ImageListItem
                                key={item.img}
                                onClick={() => cateogoryClick(item.title)}
                                className='category-tile'
                            >
                                <img
                                    src={`${item.img}?w=244&h=244&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=244&h=244&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading='lazy'
                                />
                                <ImageListItemBar title={item.title} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </>
    );
};
