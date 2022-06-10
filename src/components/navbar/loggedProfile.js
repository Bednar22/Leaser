import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Person from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Logout from '@mui/icons-material/Logout';
import { Typography, Avatar, Menu, MenuItem, Divider, Box, Stack } from '@mui/material';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utilities/auth';
import axios from 'axios';

export const LoggedProfile = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const auth = useAuth();
    const [points, setPoints] = useState(null);
    const [nickName, setNickName] = useState(auth.user.nickName);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const logout = () => {
        auth.logout();
        navigate('/');
    };

    const config = {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('leaserToken')}`,
        },
    };

    const getPoints = () => {
        axios
            .get(`/api/Accounts/${auth.user.id}/User`, config)
            .then((res) => {
                setPoints(res.data.points);
            })
            .catch((err) => {
                console.log(err.response.data);
        });
    }

    useEffect(() => {
        getPoints();
    }, []);

    return (
        <> 
        <Stack direction='row' spacing={1}>   
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
            <Stack direction='column' spacing={0} style={{ left: 2 }}>   
                    <Typography sx={{wordWrap: 'break-word'}} style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }}>
                        {nickName}
                    </Typography>
                    <Typography sx={{wordWrap: 'break-word'}} style={{ color: '#FFFFFF', fontSize: 13 }}>
                        Points: {points}
                    </Typography>
                </Stack>
                </Stack>
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
                <MenuItem
                    onClick={() => {
                        navigate(`/user/profile/${auth.user.id}`);
                    }}
                >
                    <ListItemIcon>
                        <Person fontSize='small' />
                    </ListItemIcon>
                    <Typography color='MenuText'>Profile</Typography>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        navigate(`/user/wallet`);
                    }}
                >
                    <ListItemIcon>
                        <AccountBalanceWalletIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography color='MenuText'>Wallet</Typography>
                </MenuItem>

                <Divider />
                <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};
