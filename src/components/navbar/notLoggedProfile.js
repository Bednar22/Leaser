import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Person from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import '../../App.css';
import { Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
export const NotLoggedProfile = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton
                    onClick={handleClick}
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        <Person />
                    </Avatar>
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link className='link-text' to='/login'>
                    <MenuItem>
                        <ListItemIcon>
                            <LoginIcon fontSize='small' />
                        </ListItemIcon>
                        <Link className='link-text' to='/login'>
                            <Typography color='MenuText'>Login</Typography>
                        </Link>
                    </MenuItem>
                </Link>
                <Divider />
                <Link className='link-text' to='/signup'>
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAddIcon fontSize='small' />
                        </ListItemIcon>

                        <Typography color='MenuText'>Sign up</Typography>
                    </MenuItem>
                </Link>
            </Menu>
        </>
    );
};
