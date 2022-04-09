import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
//components
import { Login } from './components/login_signup/login';
import { Navbar } from './components/navbar';
import { Homepage } from './components/homepage';
import { SignUp } from './components/login_signup/signUp';

/*podstawowy component, w ktorym beda sciezki  */
function App() {
    return (
        <>
            <div className='main-content-div'>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
