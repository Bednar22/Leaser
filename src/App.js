import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
//components
import { Login } from './components/login_signup/login';
import { Navbar } from './components/navbar';
import { Startpage } from './components/homepage/startpage';
import { SignUp } from './components/login_signup/signUp';
import { Homepage } from './components/homepage/homepage';
import { NoMatch } from './components/noMatch';

/*podstawowy component, w ktorym beda sciezki  */
function App() {
    const location = useLocation();
    return (
        <>
            {location.pathname === '/' ? null : <Navbar></Navbar>}
            <Routes>
                <Route path='/' element={<Startpage />} />
                <Route path='home' element={<Homepage />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
            </Routes>
        </>
    );
}

export default App;
