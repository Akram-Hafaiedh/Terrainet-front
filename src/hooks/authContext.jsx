import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userData) => {
        setUser(userData)
        setIsLoggedIn(true);
    };
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);

        // Clear the token from local storage
        localStorage.removeItem('token');
    };

    const contextValue = {
        isLoggedIn,
        user,
        login,
        logout,
        // setUser,
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


export default AuthProvider;
