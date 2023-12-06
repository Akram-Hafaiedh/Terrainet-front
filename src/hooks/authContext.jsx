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

    const getUserProfile = async (userId) => {
        try {
            // Fetch user profile data from your backend
            const response = await fetch(`/api/users/${userId}/profile`);
            const userProfile = await response.json();
            console.log('User Profile:', userProfile);
            return userProfile;
        } catch (error) {
            console.error('Error fetching user profile');
            throw error;
        }
    }
    const updateProfilePhotos = async (userId, token, formData, photoType) => {
        console.log("🚀 ~ file: authContext.jsx:35 ~ updateProfilePhotos ~ photoType:", photoType)
        console.log("🚀 ~ file: authContext.jsx:35 ~ updateProfilePhotos ~ formData:", formData)
        console.log("🚀 ~ file: authContext.jsx:35 ~ updateProfilePhotos ~ token:", token)
        console.log("🚀 ~ file: authContext.jsx:35 ~ updateProfilePhotos ~ userId:", userId)


        let updatePhotoRoute;
        if (photoType === 'profilePictureUrl') {
            updatePhotoRoute = `/api/users/${userId}/profile/profile-picture`;
        } else if (photoType === 'coverPhoto') {
            updatePhotoRoute = `/api/users/${userId}/profile/cover-photo`;
        }


        console.log("🚀 ~ file: authContext.jsx:42 ~ updateProfilePhotos ~ updatePhotoRoute:", updatePhotoRoute)
        try {
            const response = await fetch(updatePhotoRoute, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // 'photoType': photoType, // 'profilePicture' or  'coverPhoto'
                },
                body: formData,
            })
            const result = await response.json();
            console.log("🚀 ~ file: authContext.jsx:60 ~ updateProfilePhotos ~ result:", result)

            if (!response.ok) {
                console.error('File upload failed')
                const result = await response.json();
                console.log('Updated', result);
                // console.log(response);
            }

        } catch (error) {
            console.error('Error while updating user data');
            console.log(error);
            throw error;
        }
    }

    const contextValue = {
        isLoggedIn,
        user,
        login,
        logout,
        getUserProfile,
        updateProfilePhotos,
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
