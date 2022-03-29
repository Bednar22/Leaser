import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
//components
import { Login } from './components/login';
import { Navbar } from './components/navbar';
import { Homepage } from './components/homepage';
import { SignUp } from './components/signUp';

/*podstawowy component, w ktorym beda sciezki  */
function App() {
    return (
        <>
            <Navbar></Navbar>
            <Container>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='login' element={<Login />} />
                    <Route path='rejestracja' element={<SignUp />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
