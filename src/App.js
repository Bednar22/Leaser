import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
//components
import { Login } from './components/login_signup/login';
import { Navbar } from './components/navbar';
import { Homepage } from './components/homepage';
import { SignUp } from './components/login_signup/signUp';
import { NoMatch } from './components/noMatch';

/*podstawowy component, w ktorym beda sciezki  */
function App() {
    return (
        <>
            <Navbar></Navbar>
            <Container>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='*' element={<NoMatch />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
