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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddOffer } from './components/offers/addOffer';
import { AuthProvider, useAuth } from './components/utilities/auth';
import { RequireAuth } from './components/utilities/requireAuth';
import { NoAuthPath } from './components/utilities/noAuthPath';
import { OfferDetails } from './components/offers/offerDetails';
import { Booking } from './components/offers/booking';
import { EditOffer } from './components/offers/editOffer';
import { TransactionsMain } from './components/transactions/transactionsMain';
import { TransactionSummary } from './components/offers/transactionSummary';

//mui imports
import { Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


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
    const [search, setSearch] = useState(null);

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
                        <Route
                            path='offers'
                            element={
                                <RequireAuth>
                                    <MainOffersPage search={search} setSearch={setSearch} />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='home'
                            element={
                                <RequireAuth>
                                    <Homepage setSearch={setSearch} />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='offers/offerDetails/:id'
                            element={
                                <RequireAuth>
                                    <OfferDetails />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='offers/offerDetails/:id/booking'
                            element={
                                <RequireAuth>
                                    <Booking />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='offers/transactionSummary/:id'
                            element={
                                <RequireAuth>
                                    <TransactionSummary />
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
                                    <TransactionsMain />
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
