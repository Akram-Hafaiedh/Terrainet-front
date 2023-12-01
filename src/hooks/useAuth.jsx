import { useContext } from "react";
import { AuthContext } from './authContext';
// Create a custom hook to consume the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used whithin an Authprovider');
    }
    return context
};
