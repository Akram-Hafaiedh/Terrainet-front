// import PropTypes from 'prop-types';

import { useState } from "react";
import { FaFacebookF, FaGithubAlt, FaGoogle } from "react-icons/fa";
import myLogo from '/terrainet-v2.svg'
import { Link } from "react-router-dom";
// import bg from '/courbe2.svg'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";



const Login = () => {
    const { login } = useAuth();
    // const { user, login, logout } = useAuth();
    const [formData, setFormData] = useState({});
    const [validationMsg, setValidationMsg] = useState('');
    let navigate = useNavigate();

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleProviderLogin = (provider) => {
        console.log(`Logging in with ${provider}`);
    }


    // const [count, setCount] = useState(0)

    const loginUser = async (formData, navigate) => {

        try {
            const res = await fetch('/api/auth/login', {
                method: "POST", //*GET, POST, PUT, DELETE, etc
                headers: {
                    "Content-Type": "application/Json",
                    //* "Content-Type":"application/x-www-form-urlencoded"
                },
                body: JSON.stringify(formData),  //*parses JSON response into native JS object
            })
            if (!res.ok) {
                // Handle non-successful response
                const errorData = await res.json();
                console.log('Login Failed:', errorData.message);
                const errorMessage = errorData.message || 'Login failed.';
                setValidationMsg(errorMessage)
                return;
            }
            const data = await res.json();
            console.log(data);
            const userData = data.user;
            console.log('userData:', userData);
            // Store the token in localStorage
            localStorage.setItem('token', data.token);

            // store the user information in state or context
            // setUser(data.user);
            login(userData);

            // Clear any previous validation messages
            setValidationMsg('');

            // Redirect to the home page
            navigate('/');

        } catch (error) {
            console.log('Login failed:', error);
            setValidationMsg('An unexpected error occured.');
        }

    }
    const handleLogin = async (e) => {
        // Perform login logic here (e.g., send data to a server)
        e.preventDefault();
        console.log(formData);
        loginUser(formData, navigate)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden'>
            <div className="relative max-w-xl">
                <div className="blur-3xl animation-delay-500 animate-bounce-from-left absolute -left-40 -top-5 w-64 h-64 rounded-full bg-[#202A5D] transform mix-blend-multiply filter opacity-70"></div>
                <div className="blur-2xl animate-bounce absolute -bottom-20 left-1/2 w-96 h-96 rounded-full bg-[#EC4C60] transform mix-blend-multiply filter  opacity-70"></div>

                {/* <img className="hidden sm:block scale h-screen absolute inset-x-auto w-auto z-0" src={bg} alt="background" /> */}

                <div className="relative z-10 bg-white dark:text-gray-100 dark:bg-gray-900 p-8 shadow-2xl m-6 rounded-md w-96">
                    <div className='text-sm'>
                        <Link to="/"><img className="mx-auto w-auto h-32 mb-6" src={myLogo} alt="Terrainet Logo" /></Link>
                        <h2 className="dark:text-white font-semibold text-xl mb-2">Log in to your account</h2>
                        <p>D&apos;ont have an account ? <Link to="/register" className="text-blue-500 hover:underline pointer" href="">Register</Link> for free.</p>
                        <p></p>
                    </div>
                    <form className='space-y-6 mt-4'>
                        <div>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1  dark:bg-gray-900 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                >Email</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:bg-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                >Password</label>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                onClick={handleLogin}
                            >
                                Log in
                            </button>
                        </div>
                        {/* Provider Buttons */}
                        <div className='flex justify-center space-x-2'>

                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                type="button"
                                onClick={() => handleProviderLogin('Google')}
                            >
                                <FaGoogle />
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                type="button"
                                onClick={() => handleProviderLogin('Facebook')}
                            >
                                <FaFacebookF />
                            </button>
                            <button
                                className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900"
                                type="button"
                                onClick={() => handleProviderLogin('GitHub')}
                            >
                                <FaGithubAlt />
                            </button>
                        </div>
                    </form>
                    {/* Display validation message if present */}
                    {validationMsg && <div className="text-center mt-2 text-red-800">{validationMsg}</div>}

                </div>
            </div>
        </div>
    )
};


Login.propTypes = {

};


export default Login;
