// import PropTypes from "prop-types";

const Profile = () => {
    // For now, let's use a placeholder user object
    const user = {
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        // Add other user properties as needed
    };
    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Profile Page</h2>
            <div className="flex space-x-4">
                <div>
                    <img
                        src={user.avatar} // Replace with the actual avatar URL
                        alt={`${user.username}'s Avatar`}
                        className="w-24 h-24 rounded-full"
                    />
                </div>
                <div>
                    <p className="text-lg font-semibold">{user.username}</p>
                    <p className="text-gray-600">{user.email}</p>
                    {/* Add other user details here */}
                </div>
            </div>
            {/* Add more sections for additional user details */}
        </div>
    );

};

Profile.propTypes = {
    // user: PropTypes.object,
};

export default Profile;
