import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Typography, Stack, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import BackgroundImagePath from '../../assets/hero_background_img.svg';
import BackgroundImageMobilePath from '../../assets/hero_background_img_mobile.svg';

export const Startpage = (props) => {

    const smallSize = useMediaQuery('(max-width:850px)');
    let appropriateBackgroundImage;
    if (smallSize) {
        appropriateBackgroundImage = BackgroundImageMobilePath;
    } else {
        appropriateBackgroundImage = BackgroundImagePath;
    }

    return (
        <>
            <Box
                style={{
                    backgroundImage: `url(${appropriateBackgroundImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100vh'
            >
                <NavLink to='/login' style={{ textDecoration: 'none', margin: '32px' }}>
                    <Button variant='contained' style={{ backgroundColor: '#FFA89A', position: 'absolute', right: 17, top: 17 }}>
                        <Typography variant='h6'>Log in</Typography>
                    </Button>
                </NavLink>
                <Stack alignItems='center' direction='column'>
                    <Typography variant='h4' align='center' fontWeight='bold' color='#FAF7F0'>
                        Tired of buying new things you will use only once?
                    </Typography>
                    <Typography variant='h5' align='center' color='#FAF7F0'>
                        Why not just rent them instead?
                    </Typography>
                    <NavLink to='/signup' style={{ textDecoration: 'none', margin: '32px' }}>
                        <Button variant='contained' style={{ backgroundColor: '#FFA89A' }}>
                            <Typography variant='h5'>Start using Leaser</Typography>
                        </Button>
                    </NavLink>
                </Stack>
            </Box>
        </>
    );
};
