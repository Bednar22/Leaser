import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Container } from '@mui/material';
import { UserSettings } from './userSettings';
import { UserRatings } from './userRatings';
import { UserOffers } from './userOffers';

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

export const Profile = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 1 / 1 }}>
            <Container sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs sx={{ width: 1 / 1 }} value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab
                        sx={{ width: 1 / 3 }}
                        label={
                            <>
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    <LocalOfferIcon sx={{ mr: 1 }} />
                                    <Typography> My offers</Typography>
                                </Box>
                            </>
                        }
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{ width: 1 / 3 }}
                        label={
                            <>
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    <StarIcon sx={{ mr: 1 }} />
                                    <Typography> Reviews</Typography>
                                </Box>
                            </>
                        }
                        {...a11yProps(1)}
                    />
                    <Tab
                        sx={{ width: 1 / 3 }}
                        label={
                            <>
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    <SettingsIcon sx={{ mr: 1 }} />
                                    <Typography> User data</Typography>
                                </Box>
                            </>
                        }
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Container>
            <TabPanel value={value} index={0}>
                <UserOffers />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserRatings />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <UserSettings />
            </TabPanel>
        </Box>
    );
};
