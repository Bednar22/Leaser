import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Typography, Stack, Box } from '@mui/material';

import BackgroundImagePath from '../assets/hero_background_img.svg';
import BackgroundImageMobilePath from '../assets/hero_background_img_mobile.svg';


export const Homepage = (props) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    React.useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    const background_img_change_breakpoint = 850;
    let appropriateBackgroundImage;
    if (windowWidth > background_img_change_breakpoint) {
        appropriateBackgroundImage = BackgroundImagePath;
    }
    else {
        appropriateBackgroundImage = BackgroundImageMobilePath;
    }

    return (
        <>
            <Box
                style={{
                        'background-image': `url(${appropriateBackgroundImage})`,
                        'background-position': 'center',
                        'background-size': 'cover'
                    }}
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100%'
            >
                <Stack alignItems='center' direction='column'>
                    <Typography variant='h4' align='center' fontWeight='bold' color='#FAF7F0'>
                        Tired of buying new things you will use only once?
                    </Typography>
                    <Typography variant='h5' align='center' color='#FAF7F0'>
                        Why not just rent them instead?
                    </Typography>
                    <NavLink to='/signup' style={{ 'text-decoration': 'none', 'margin': '32px'}}>
                        <Button variant='contained' style={{'background-color': '#FFA89A'}}>
                            Start using Leaser
                        </Button>
                    </NavLink>
                </Stack>
            </Box>
        </>
    );
};
