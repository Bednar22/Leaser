import axios from 'axios';
import { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);

    const login = () => {
        checkUser();
    };
    const logout = () => {
        setUser(null);
        setAddress(null);
        window.localStorage.removeItem('leaserToken');
    };

    const getAddress = () => {
        const token = window.localStorage.getItem('leaserToken');
        axios
            .get('/api/Addresses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setAddress(res.data);
            })
            .catch((err) => {
                setAddress(null);
            });
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
                    getAddress();
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

    return <AuthContext.Provider value={{ user, address, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
