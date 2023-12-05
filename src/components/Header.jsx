import {
    FaCalendar,
    // FaSearch,
    // FaUserCircle
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import {
    Link,
    // Navigate,
    useNavigate
} from 'react-router-dom';
import Dropdown from "./Dropdown";
import DarkModeButton from "./DarkModeButton";
import useDarkMode from "../hooks/useDarkMode";

import logoicon from '/balls.svg'
import logoTextLight from '/terrainet-light.svg'
import logoTextDark from '/terrainet-light.svg'
import { useEffect, useState } from "react";



const Header = () => {
    const [isDarkMode, setIsDarkMode] = useDarkMode();
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState(null);
    const { user, logout, getUserProfile } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const userProfile = await getUserProfile(user.id);
                    setUserProfile(userProfile);
                    // console.log("🚀 ~ file: Header.jsx:33 ~ fetchProfile ~ userProfile:", userProfile)
                } catch (error) {
                    console.error("Error fetching user profile", error);
                }
            }
        }
        fetchProfile();
    }, [user, getUserProfile]);

    const handleLogout = async () => {
        console.log('Logout button clicked');
        await logout();
        navigate('/login');
    }

    const handleSettingsClick = () => {
        console.log('go to settings page');
    }

    const dropdownOptions = [
        // Add other options as needed
        {
            label: 'User',
            items: [
                { label: 'Profile', to: '/profile' },
                { label: 'Settings', action: handleSettingsClick },
            ]
        },
        {
            label: 'Reservations',
            items: [
                { label: 'My Reservations' },
            ]
        },
        {
            label: 'Teams',
            items: [

                { label: 'Team' },
                { label: 'Invite users' },
                { label: 'New team' },
            ]
        },
        {
            label: 'Account',
            items: [
                { label: 'Logout', action: handleLogout }
            ]
        },
    ];
    return (
        <header className="shadow-md bg-slate-200 dark:bg-gray-800">
            <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
                <Link to="./">
                    
                    <h1 className="flex flex-wrap text-sm font-bold sm:text-xl space-x-2">
                        <img className="w-14 mr-4" src={logoicon} alt="" />
                        {
                            isDarkMode
                                ? logoTextDark
                                    ? <img className="w-14 mr-4" src={logoTextDark} alt="" />
                                    : (<div className="hidden md:block">
                                        <span className="text-slate-500 dark:text-white/70">Terrai</span>
                                        <span className="text-slate-700 dark:text-white">Net</span>
                                    </div>)
                                : logoTextLight
                                    ? <img className="w-14 mr-4" src={logoTextLight} alt="" />
                                    : (
                                        <div className="hidden md:block">
                                            <span className="text-slate-500 dark:text-white/70">Terrai</span>
                                            <span className="text-slate-700 dark:text-white">Net</span>
                                        </div>
                                    )
                        }
                    </h1>
                </Link>

                {/* <form className="flex items-center rounded-lg bg-slate-100">
                    <label className='relative block'>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                            <FaSearch className='w-5 h-5 fill-slate-300' />
                        </span>
                        <input type="text" placeholder="Search..." name="" id=""
                            className="w-24 py-2 pr-3 bg-white rounded-md pl-9 placeholder:text-slate-400 placeholder:italic focus:outline-none sm:w-64"
                        />

                    </label>
                </form> */}
                <ul className='flex items-center gap-3'>
                    {/* <DarkModeButton /> */}
                    <Link to="/calendar" className='p-3 bg-transparent rounded-full hover:bg-gray-600/10 dark:hover:bg-white/10'>
                        <li><FaCalendar className='dark:text-white' /></li>
                    </Link>
                    <DarkModeButton howLabel={false} onDarkMode={() => setIsDarkMode(!isDarkMode)} />

                    <Link to="/about">
                        <li className='hidden hover:underline sm:inline dark:text-gray-100'>About</li>
                    </Link>
                    <Link to="/events">
                        <li className='hidden hover:underline sm:inline dark:text-gray-100'>Events</li>
                    </Link>
                    <Link to="/participate">
                        <li className='hidden hover:underline sm:inline dark:text-gray-100'>Participate</li>
                    </Link>
                    <Link to="/ladder">
                        <li className='hidden hover:underline sm:inline dark:text-gray-100'>Ladder</li>
                    </Link>



                    <Link to="/dashboard">
                        <li className='hidden hover:underline sm:inline dark:text-gray-100'>Dashboard</li>
                    </Link>
                    {
                        user ? (
                            // <Dropdown options={options} isDarkMode={isDarkMode} user={user} />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    {user ? (
                                        userProfile ? (
                                            <img
                                                src={`/api/uploads/${userProfile.profilePictureUrl}`}
                                                alt="User Avatar"
                                                className={`w-8 h-8 rounded-full cursor-pointer dark:shadow-white shadow-md`}
                                            />
                                        ) : (
                                            <div className={`w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center`}>
                                                <span className="text-white font-semibold">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )
                                    ) : (
                                        <Link to="/login">
                                            <li className="hover:underline dark:text-gray-100">Sign In</li>
                                        </Link>
                                    )}
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="48" contentClasses="py-1 bg-white">
                                    {/* {isOpen && (
                                        <ul className="z-[4] w-48 tracking-widest absolute top-8 right-8 bg-white border rounded shadow-sm focus:ring-2 focus:outline-none z-1 transition ease-in-out space-y-2 ">
                                            {options.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleOptionClick(option.action)}
                                                    className="py-2 px-4 hover:bg-gray-200/40 cursor-pointer hover:underline"
                                                >
                                                    {option.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )} */}
                                    {user && (

                                        <>
                                            <div className="px-4 flex flex-col py-2">
                                                <div><span className="font-medium">signed in as :</span> {user.username}</div>
                                                <div className="font-medium">{user.email}</div>
                                            </div>


                                            <div className="flex flex-col divide-y">
                                                {dropdownOptions.map((group, groupIndex) => (
                                                    <div key={groupIndex}>
                                                        {
                                                            group.label && (
                                                                <div className="sr-only py-2 px-4 text-gray-700 dark:text-gray-200 font-bold">
                                                                    {group.label}
                                                                </div>
                                                            )
                                                        }
                                                        {group.items.map((option, index) => {
                                                            // console.log(option);
                                                            return (
                                                                <div className="flex flex-col"
                                                                    key={index}
                                                                >
                                                                    <Dropdown.Link
                                                                        onClick={option.action}
                                                                        route={option.to}
                                                                        // onClick={() => console.log('action')}
                                                                        className={'py-2 text-sm px-4 hover:bg-gray-200/40 cursor-pointer'}>
                                                                        {option.label}
                                                                    </Dropdown.Link>
                                                                </div>
                                                            )
                                                        })}

                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <Link to="/login">
                                <li className='hover:underline dark:text-gray-100'>Sign In</li>
                            </Link>
                        )
                    }
                    {/* Other header content */}
                </ul>
            </div>
        </header>


    );
}

export default Header;
