import axios from 'axios';
import { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = () => {
        checkUser();
    };
    const logout = () => {
        setUser(null);
        window.localStorage.removeItem('leaserToken');
    };

    const checkUser = () => {
        if (window.localStorage.getItem('leaserToken')) {
            const token = window.localStorage.getItem('leaserToken');
            axios
                .get('api/Accounts/User', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    setUser(null);
                    window.localStorage.removeItem('leaserToken');
                });
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
