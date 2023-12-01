// import PropTypes from 'prop-types';

import { useState } from "react";
import { FaFacebookF, FaGithubAlt, FaGoogle } from "react-icons/fa";
import myLogo from '/terrainet-v2.svg'
// import bg from '/courbe2.svg'
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState('')



    const handleProviderLogin = (provider) => {
        console.log(`Logging in with ${provider}`);
    }

    function handleChange(e) {
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value
            })
    }
    // const [count, setCount] = useState(0)
    const handleLogin = async (e) => {
        // Perform login logic here (e.g., send data to a server)
        e.preventDefault();
        console.log(formData);

        const res = await fetch('/api/auth/register', {
            method: "POST", //*GET, POST, PUT, DELETE, etc
            headers: {
                "Content-Type": "application/Json",
                //* "Content-Type":"application/x-www-form-urlencoded"
            },
            body: JSON.stringify(formData),  //*parses JSON response into native JS object
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className=' min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden'>
            <div className="relative max-w-xl">
                <div className="blur-3xl animation-delay-500 animate-bounce-from-left absolute -left-40 -top-5 w-64 h-64 rounded-full bg-[#202A5D] transform mix-blend-multiply filter opacity-70"></div>
                <div className="blur-2xl animate-bounce absolute -bottom-20 left-1/2 w-96 h-96 rounded-full bg-[#EC4C60] transform mix-blend-multiply filter  opacity-70"></div>

                {/* <img className="hidden sm:block scale h-screen absolute inset-x-auto w-auto z-0" src={bg} alt="background" /> */}
                <div className="relative z-10 bg-white p-8 shadow-md rounded-md w-96">
                    <div className='text-sm'>
                        <Link to="/"><img className="mx-auto w-auto h-32 mb-6" src={myLogo} alt="Terrainet Logo" /></Link>
                        <h2 className="font-semibold text-xl mb-2">Log in to your account</h2>
                        <p>You already have an account ? <Link to="/login" className="text-blue-500 hover:underline pointer" href="">Login</Link> to your account.</p>
                        <p></p>
                    </div>
                    <form className='space-y-6 mt-4'>
                        <div>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    required
                                    className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                >Username</label>
                            </div>

                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                                    className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                >Password</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="password"
                                    id="password-confirmation"
                                    name="password-confirmation"
                                    autoComplete="current-password"
                                    required
                                    className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                >Password Confirmation</label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                onClick={handleLogin}
                            >
                                Sign in
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

                </div>
            </div>
        </div>
    )
};


Register.propTypes = {

};


export default Register;
