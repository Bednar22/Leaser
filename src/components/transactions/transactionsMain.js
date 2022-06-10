import { useState, useEffect } from 'react';
import { useAuth } from '../utilities/auth';
import axios from 'axios';
import { Grid, Box, Typography, Container } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { LeasedTrans } from './leasedTrans';
import { BorrowedTrans } from './borrowedTrans';
import '../../App.css';
import { AddPoints } from './addPoints';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TransactionsMain = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: 1 / 1 }}>
                <Grid container justifyContent='center'>
                    <Grid item xs={8}>
                        <AddPoints></AddPoints>
                    </Grid>
                    <Grid item xs={12}>
                        <Container sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                centered
                                value={value}
                                onChange={handleChange}
                                aria-label='basic tabs example'
                                variant='fullWidth'
                            >
                                <Tab
                                    label={
                                        <>
                                            <Box className='tab'>
                                                <Typography> Leased</Typography>
                                            </Box>
                                        </>
                                    }
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    label={
                                        <>
                                            <Box className='tab'>
                                                <Typography> Borrowed</Typography>
                                            </Box>
                                        </>
                                    }
                                    {...a11yProps(1)}
                                />
                            </Tabs>
                        </Container>
                        <TabPanel value={value} index={0}>
                            <LeasedTrans></LeasedTrans>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <BorrowedTrans></BorrowedTrans>
                        </TabPanel>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
