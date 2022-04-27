import React from 'react';
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
import { UserSettings } from './components/user_profile/userSettings';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddOffer } from './components/offers/addOffer';

import { OfferDetails } from './components/offers/offerDetails';
import SampleImage from './assets/sample-image.jpg'

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
                        availableTo={new Date(2022, 5, 26)}
                    />} />
                    <Route path='*' element={<NoMatch />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
