import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
//components
import { Login } from './components/login_signup/login';
import { Navbar } from './components/navbar';
import { Startpage } from './components/homepage/startpage';
import { SignUp } from './components/login_signup/signUp';
import { MainOffersPage } from './components/offers/mainOffersPage';
import { Homepage } from './components/homepage/homepage';
import { NoMatch } from './components/noMatch';
import { Profile } from './components/user_profile/profile';
import { UserSettings } from './components/user_profile/userSettings';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddOffer } from './components/offers/addOffer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7ec3a6',
            contrastText: "#fff"
        },
        secondary: {
            main: '#ffa89a',
            contrastText: "#fff"
        },
    },
});

/*podstawowy component, w ktorym beda sciezki  */
function App() {
    const location = useLocation();
    return (
        <>
            <ThemeProvider theme={theme}>
                {location.pathname === '/' ? null : <Navbar></Navbar>}
                <Routes>
                    <Route path='/' element={<Startpage />} />
                    <Route path='home' element={<Homepage />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='offers' element={<MainOffersPage />} />
                    <Route path='addOffer' element={<AddOffer />} />
                    <Route path='user/settings' element={<UserSettings />} />
                    <Route path='user/profile' element={<Profile />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
