// import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FaLocationDot } from "react-icons/fa6";
import { GiPresent } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";


const Profile = () => {
    // For now, let's use a placeholder user object

    const { user, getUserProfile, updateProfilePhotos } = useAuth();
    const [profile, setProfile] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const userProfile = await getUserProfile(user.id);
                    setProfile(userProfile)
                } catch (error) {
                    console.error('Error fetching user profile', error);
                }
            }
        }
        fetchProfile()
    }, [user, getUserProfile])

    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0])
    // }

    const handlePhotoChange = async (e) => {
        try {
            const photoType = e.target.name;
            console.log(photoType);
            if (photoType === undefined || !photoType) {
                console.error('Missing photoType argument in handlePhotoChange');
                return;
            }
            const newSelectedFile = e.target.files[0];
            console.log('Selected file:', newSelectedFile);

            if (!newSelectedFile) {
                console.error('No file selected for upload');
                return;
            }
            console.log(`New ${photoType} selected:`, newSelectedFile);

            const token = localStorage.getItem('token');
            // Update the selected file in the component state
            setSelectedFile(newSelectedFile);

            const formData = new FormData();
            formData.append(photoType, newSelectedFile, newSelectedFile.name);

            await updateProfilePhotos(user.id, token, formData, photoType);

            const refreshedProfile = await getUserProfile(user.id);
            setProfile(refreshedProfile);
        } catch (error) {
            console.log(error);
            // console.error(`error uploading profile photos`, error);
        }
    }



    if (!user || !profile) {
        // If user or profile is not available, you can redirect them to the login page
        // You can use Navigate component or other routing methods
        console.log('user:', user, 'profile:', profile)
        return null;
    }

    const coverPhotoUrl =
        `/api/uploads/${profile.coverPhoto}`

    // 'https://images.unsplash.com/photo-1701453831008-ea11046da960?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


    return (
        <>
            <section className="relative block h-[500px]">
                <div className={`absolute top-0 w-full h-full bg-center bg-cover`}
                    style={{ backgroundImage: `url('${coverPhotoUrl}')` }}
                >
                    <span className="w-full h-full absolute bg-black/50"></span>
                </div>
                <div className="h-[70px] bottom-0 absolute pointer-events-none overflow-hidden left-0 right-0 " style={{ transform: 'translateZ(0px)' }}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blue-50 dark:text-gray-700 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
                <div className="flex items-center  rounded absolute right-0 mr-4 mt-4 ">

                    <label
                        htmlFor="coverPhoto"
                        // onClick={(e) => handleLabelClick(e, 'coverPhoto')}
                        className="flex px-3 py-2 space-x-2 items-center text-xs text-gray-100 cursor-pointer ">Change Cover Photo
                        <input
                            id="coverPhoto"
                            name="coverPhoto"
                            className="hidden w-full h-full"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            type="file" />
                        <FaRegEdit className=" text-gray-100" />
                    </label>
                </div>
            </section>
            <section className="relative py-16 bg-blue-50 dark:bg-gray-700">
                <div className="container max-w-6xl  mx-auto px-4 ">
                    <div className="shadow-lg rounded-t-lg -mt-44">
                        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="grid grid-cols-1 sm:grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                                    <div>
                                        {/* <p className="font-bold text-gray-700 text-xl">{user.friends}</p> */}
                                        <p className="font-bold dark:text-white text-gray-700 text-xl">0</p>
                                        <p className="text-gray-400 dark:text-white text-sm">Friends</p>
                                    </div>
                                    <div>
                                        <p className="font-bold dark:text-white text-gray-700 text-xl">{user.reservations.length}</p>
                                        <p className="text-gray-400 dark:text-white text-sm">Reservations</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 dark:text-white text-xl">{user.eventsParticipated.length}</p>
                                        <p className="text-gray-400 dark:text-white text-sm">Events</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    {profile.profilePictureUrl ? (
                                        // <div className="relative">
                                        <>
                                            <img
                                                src={`/api/uploads/${profile.profilePictureUrl}`}
                                                alt="User Avatar"
                                                className="absolute inset-0 rounded-full z-10 w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 mx-auto -mt-24"
                                            />
                                            <div className="absolute bottom-0 w-6 h-6 md:h-8 md:w-8 lg:w-10 lg:h-10 flex bg-black/50 rounded-full items-center justify-center">
                                                <label
                                                    htmlFor="profilePictureUrl"
                                                    // onClick={(e) => handleLabelClick(e, 'profilePicture')}
                                                    className="flex px-3 py-2 space-x-2 items-center text-xs text-gray-100 cursor-pointer "
                                                >
                                                    <FaRegEdit className="text-white text-xs" />
                                                    <input
                                                        // ref={coverPhotoInputRef}

                                                        id="profilePictureUrl"
                                                        name="profilePictureUrl"
                                                        className="hidden w-full h-full"
                                                        accept="image/*"
                                                        onChange={handlePhotoChange}
                                                        type="file" />
                                                </label>
                                            </div>
                                        </>

                                        // </div>
                                    ) : (
                                        <div className="z-10 w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 bg-blue-500 mx-auto shadow-2xl rounded-full inset-x-0 top-0 absolute flex items-center justify-center -mt-24">
                                            <span className="text-white text-5xl md:text-6xl lg:text-8xl font-semibold">
                                                {user.username.charAt(0).toUpperCase()}
                                            </span>

                                            <div className="absolute bottom-px right-px lg:right-3 lg:bottom-3 w-6 h-6 md:h-8 md:w-8 lg:w-10 lg:h-10 flex bg-black/50 rounded-full items-center justify-center">
                                                <label
                                                    htmlFor="profilePictureUrl"
                                                    // onClick={(e) => handleLabelClick(e, 'profilePicture')}
                                                    className="flex px-3 py-2 space-x-2 items-center text-xs text-gray-100 cursor-pointer "
                                                >
                                                    <FaRegEdit className="text-white text-xs" />
                                                    <input
                                                        // ref={coverPhotoInputRef}

                                                        id="profilePictureUrl"
                                                        name="profilePictureUrl"
                                                        className="hidden w-full h-full"
                                                        accept="image/*"
                                                        onChange={handlePhotoChange}
                                                        type="file" />
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className="space-y-4 md:space-y-0 md:space-x-3 flex flex-col md:flex-row mt-20 md:mt-0 lg:mt-0 md:justify-center items-center">
                                    <button
                                        className="max-w-sm text-white text-sm p-2 rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    >
                                        Connect
                                    </button>
                                    <button
                                        className="max-w-sm text-white text-sm p-2 rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    >
                                        Message
                                    </button>
                                </div>
                            </div>

                            <div className="mt-20 text-center border-b pb-12">
                                <h1 className="text-4xl font-medium text-gray-700 dark:text-white">{profile.firstName} {profile.lastName} ({user.username}), <span className="font-light text-gray-500 dark:text-gray-200">{profile.ladderPoints} points</span></h1>
                                {/* TODO : Profile location might be a point for mapping*/}

                                <div className="my-5">
                                    <p className="flex items-center justify-center dark:text-white space-x-2"><FaLocationDot className="text-xl" /> <span>Location :</span></p>
                                    {profile.location ? (
                                        <p className="text-gray-600 dark:text-gray-200 text-center font-medium">{profile.location}</p>
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-200 text-center font-light">This user didnt add his location yet</p>
                                    )}
                                </div>
                                <div>
                                    <p className="flex items-center dark:text-white justify-center space-x-2"> <GiPresent className="text-2xl" /><span>Prizes :</span></p>
                                    {profile.tournamentPrizes.length === 0 ? (
                                        <p className="text-gray-600  dark:text-gray-200 text-center font-light">This user doesnt have any prize yet</p>
                                    ) : (
                                        <>
                                            <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                                            <p className="mt-2 text-gray-500">University of Computer Science</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col justify-center">
                                <p className="text-gray-600 dark:text-white text-center font-light lg:px-16">{profile.bio}</p>
                                <button
                                    className="text-indigo-500 py-2 px-4  font-medium mt-4"
                                >
                                    Show more
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* You can add more user-related information here */}
                </div >
            </section>
        </>
    );

};

Profile.propTypes = {
    // user: PropTypes.object,
};

export default Profile;
