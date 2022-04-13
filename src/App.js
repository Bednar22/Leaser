import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
//components
import { Login } from './components/login_signup/login';
import { Navbar } from './components/navbar';
import { Homepage } from './components/homepage';
import { SignUp } from './components/login_signup/signUp';
import {OfferTile} from './components/offerTile';

import SampleImagePath from './sample-image.jpg'

/*podstawowy component, w ktorym beda sciezki  */
function App() {
    return (
        <>
            <Navbar></Navbar>
            <Container>
                <OfferTile 
                    renterName='Jan Kowalski' 
                    renterNickname='jkowalski' 
                    offerTitle='Camera' 
                    renterScore='4.5' 
                    pricePerDay='10'
                    titleImage={SampleImagePath}
                ></OfferTile>
                {/* <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                </Routes> */}
            </Container>
        </>
    );
}

export default App;
