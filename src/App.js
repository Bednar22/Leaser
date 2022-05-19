import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
//components
import { Login } from './components/login_signup/login';
import { Navbar } from './components/navbar/navbar';
import { Startpage } from './components/homepage/startpage';
import { SignUp } from './components/login_signup/signUp';
import { MainOffersPage } from './components/offers/mainOffersPage';
import { Homepage } from './components/homepage/homepage';
import { NoMatch } from './components/noMatch';
import { Profile } from './components/user_profile/profile';
import { Wallet } from './components/user_profile/wallet';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddOffer } from './components/offers/addOffer';
import { AuthProvider, useAuth } from './components/utilities/auth';
import { RequireAuth } from './components/utilities/requireAuth';
import { NoAuthPath } from './components/utilities/noAuthPath';
//mui imports
import { Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { OfferDetails } from './components/offers/offerDetails';
import SampleImage from './assets/sample-image.jpg';
import { ReviewList } from './components/reviews/reviewList';
import { AddReview } from './components/reviews/addReview';
import { Booking } from './components/offers/booking'
import { EditOffer } from './components/offers/editOffer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7ec3a6',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ffa89a',
            contrastText: '#fff',
        },
    },
});

/*podstawowy component, w ktorym beda sciezki  */
function App() {
    const [open, setOpen] = useState(false);
    const auth = useAuth();

    const handleClickSnackbar = () => {
        setOpen(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size='small' aria-label='close' color='inherit' onClick={handleCloseSnackbar}>
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );

    const location = useLocation();
    return (
        <>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    {location.pathname === '/' ? null : <Navbar></Navbar>}
                    <Routes>
                        <Route path='/' element={<Startpage />} />
                        <Route
                            path='login'
                            element={
                                <NoAuthPath>
                                    <Login />
                                </NoAuthPath>
                            }
                        />
                        <Route
                            path='signup'
                            element={
                                <NoAuthPath>
                                    <SignUp />
                                </NoAuthPath>
                            }
                        />
                        <Route path='offers' element={<MainOffersPage />} />
                        <Route
                            path='home'
                            element={
                                <RequireAuth>
                                    <Homepage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='addOffer'
                            element={
                                <RequireAuth>
                                    <AddOffer handleClickSnackbar={handleClickSnackbar} />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='offer/editOffer/:offerId'
                            element={
                                <RequireAuth>
                                    <EditOffer />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='user/wallet'
                            element={
                                <RequireAuth>
                                    <Wallet />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='user/profile/:id'
                            element={
                                <RequireAuth>
                                    <Profile />
                                </RequireAuth>
                            }
                        />
                        <Route path='*' element={<NoMatch />} />
                        <Route path='offerDetails' element={<OfferDetails 
                            offerTitle='Digital camera'
                            offerDescription='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at consectetur purus. Sed sit amet ligula mattis, posuere nulla vitae, dapibus lorem. Vestibulum quis nunc et est interdum facilisis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam enim odio, porttitor id pretium non, rutrum at nisl. Pellentesque faucibus risus quis orci dapibus, eget rutrum sem congue. Donec ullamcorper ut nibh a vulputate. Integer neque lacus, congue sed ex in, pharetra dapibus lorem.'
                            pricePerDay={10}
                            pricePerWeek={8}
                            pricePerMonth={5}
                            deposit={100}
                            offerImage={SampleImage}
                            renterName='Jan Kowalski'
                            renterNickname='jkowalski'
                            renterScore={4.5}
                            offerCity='Wrocław'
                            availableFrom={new Date(2022, 3, 20)}
                            availableTo={new Date(2022, 7, 26)}
                        />} />
                        <Route path='offerDetails/booking' element={<Booking />} />
                        <Route
                            path='addReview'
                            element={
                                <RequireAuth>
                                    <AddReview
                                        reviewedUserNickname='jkowalski'
                                        reviewedUserId='53C3E28D-D310-4DAA-F76E-08DA2B9E9D15'
                                    />
                                </RequireAuth>
                            }
                        />
                        <Route path='reviewList' element={<ReviewList />} />
                    </Routes>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        // sx={{ width: 1 / 3 }}
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleCloseSnackbar}
                        // message='Post added correctly'
                        action={action}
                        key={'bottomright'}
                    >
                        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
                            Post added!
                        </Alert>
                    </Snackbar>
                </ThemeProvider>
            </AuthProvider>
        </>
    );
}

export default App;
