import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Person from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Logout from '@mui/icons-material/Logout';
import { Typography, Avatar, Menu, MenuItem, Divider, Box } from '@mui/material';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utilities/auth';

export const LoggedProfile = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const auth = useAuth();
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
                <Link to={`/user/profile/${auth.user.id}`} className='link-text'>
                    <MenuItem>
                        <ListItemIcon>
                            <Person fontSize='small' />
                        </ListItemIcon>
                        <Typography color='MenuText'>Profile</Typography>
                    </MenuItem>
                </Link>
                <Link to='/user/settings' className='link-text'>
                    <MenuItem>
                        <ListItemIcon>
                            <AccountBalanceWalletIcon fontSize='small' />
                        </ListItemIcon>
                        <Typography color='MenuText'>Wallet</Typography>
                    </MenuItem>
                </Link>
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
