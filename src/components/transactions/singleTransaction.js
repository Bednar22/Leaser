import { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Tooltip,
    Stack,
    Box,
    Grid,
    Divider,
    Skeleton,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import '../../App.css';

export const SingleTransaction = ({ postId, payerId, dateFrom, dateTo, price, status }) => {
    return (
        <>
            <Card sx={{ mb: 3, p: 2 }}>
                <CardHeader action={<></>}></CardHeader>
                <Divider sx={{ mb: 2 }}></Divider>
                <Grid container direction='row'>
                    <CardContent>
                        <Grid item >
                            <Stack direction='row'>
                                <EastIcon></EastIcon> <Typography>Pies</Typography>
                            </Stack>
                            <Stack direction='row'>
                                <WestIcon></WestIcon>
                                <Typography>Pies</Typography>
                            </Stack>
                        </Grid>
                    </CardContent>
                </Grid>
            </Card>
        </>
    );
};
