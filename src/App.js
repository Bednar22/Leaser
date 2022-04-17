import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
//components
import { Login } from './components/login_signup/login';
import { Navbar } from './components/navbar';
import { Homepage } from './components/homepage';
import { SignUp } from './components/login_signup/signUp';
import { MainOffersPage } from './components/offers/mainOffersPage';
import { NoMatch } from './components/noMatch';
import { Profile } from './components/user_profile/profile';
import { UserSettings } from './components/user_profile/userSettings';
/*podstawowy component, w ktorym beda sciezki  */
function App() {
    const location = useLocation();
    return (
        <>
            {location.pathname === '/' ? null : <Navbar></Navbar>}
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='offers' element={<MainOffersPage />} />
                <Route path='user/settings' element={<UserSettings />} />
                <Route path='user/profile' element={<Profile />} />
            </Routes>
        </>
    );
}

export default App;
