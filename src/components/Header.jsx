import { FaCalendar, FaSearch } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { Link, Navigate } from 'react-router-dom';
import Dropdown from "./Dropdown";
import DarkModeButton from "./DarkModeButton";
import useDarkMode from "../hooks/useDarkMode";

import balls from '/balls.svg'



const Header = () => {
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        return <Navigate to="/login" />;
    }

    const dropdownOptions = [
        { label: 'Logout', action: handleLogout },
        // Add other options as needed
        {
            label: <DarkModeButton onDarkMode={() => setIsDarkMode(!isDarkMode)} />
        },
        { label: 'Profile' },
        { label: 'My history' },
    ];
    return (
        <header className="shadow-md bg-slate-200 dark:bg-slate-800">
            <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
                <Link to="./">
                    <h1 className="flex flex-wrap text-sm font-bold sm:text-xl">
                        <img className="w-14 mr-4" src={balls} alt="" />
                        <span className="text-slate-500 dark:text-white/70">Terrai</span>
                        <span className="text-slate-700 dark:text-white">Net</span>
                    </h1>
                </Link>

                <form className="flex items-center rounded-lg bg-slate-100">
                    <label className='relative block'>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                            <FaSearch className='w-5 h-5 fill-slate-300' />
                        </span>
                        <input type="text" placeholder="Search..." name="" id=""
                            className="w-24 py-2 pr-3 bg-white rounded-md pl-9 placeholder:text-slate-400 placeholder:italic focus:outline-none sm:w-64"
                        />

                    </label>
                </form>
                <ul className='flex items-center gap-3'>
                    {/* <DarkModeButton /> */}
                    <Link to="/calendar" className='p-3 bg-transparent rounded-full hover:bg-gray-600/10 dark:hover:bg-white/10'>
                        <FaCalendar className='dark:text-white' />
                    </Link>

                    <Link to="/about">
                        <li className='hidden hover:underline sm:inline dark:text-gray-100'>About</li>
                    </Link>
                    {
                        user ? (
                            // <Dropdown options={options} isDarkMode={isDarkMode} user={user} />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    {user ? (
                                        user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt="User Avatar"
                                                className={`w-8 h-8 rounded-full cursor-pointer`}
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
                                        <div className="flex flex-col space-y-2 p-2">
                                            {dropdownOptions.map((option, index) => (

                                                <Dropdown.Link
                                                    key={index}
                                                    onClick={option.action}
                                                    // href={option.action}
                                                    className={'py-2 px-4 hover:bg-gray-400/40 cursor-pointer hover:underline'}>
                                                    {option.label}
                                                </Dropdown.Link>
                                            ))}
                                            {/* <Dropdown.Link href="/settings">Settings</Dropdown.Link> */}
                                            {/* <Dropdown.Link href="/logout">Logout</Dropdown.Link> */}
                                        </div>
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
