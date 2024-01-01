// import PropTypes from 'prop-types';

import { useEffect, useState } from "react";
import {
    FaFacebookF,
    // FaGithubAlt, $
    FaGoogle
} from "react-icons/fa";
import myLogo from '/terrainet-v2-light.svg'
import myLogoDark from '/terrainet-v2-dark.svg'
import { Link } from "react-router-dom";
// import bg from '/courbe2.svg'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import useDarkMode from "../hooks/useDarkMode";
import FormField from "../components/FormField";
import CustomToast from "../components/customToast";


const Login = () => {
    const [isDarkMode] = useDarkMode();
    const { login } = useAuth();
    const [fieldErrors, setFieldErrors] = useState({});
    // const { user, login, logout } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    let navigate = useNavigate();

    const [toast, setToast] = useState(null);
    useEffect(() => {
        // Clear the toast when navigating away
        return () => {
            setToast(null);
        };
    }, []);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const validateForm = () => {
        const errors = {};
        for (const field in formData) {
            if (!formData[field]) {
                errors[field] = "This field is required.";
            }
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0
    }

    const showToast = (message, success = false, onTryAgain = null) => {
        setToast(
            <CustomToast
                key="custom-toast"
                message={message}
                onClose={() => setToast(null)}
                onTryAgain={onTryAgain}
                success={success}
            // forceShow={true}
            />
        )
    }

    const handleProviderLogin = (provider) => {
        console.log(`Logging in with ${provider}`);
    }


    // const [count, setCount] = useState(0)

    const loginUser = async (formData, navigate) => {
        if (!validateForm()) {
            showToast('Please fill in all the required fields.');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: "POST", //*GET, POST, PUT, DELETE, etc
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),  //*parses JSON response into native JS object
            })
            if (response.ok) {
                const { user, token } = await response.json();
                localStorage.setItem('token', token);
                login(user);
                setToast(null);
                navigate('/');
            }
            else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Login failed.';
                showToast(errorMessage);
                return;
            }

        } catch (error) {
            console.log('Login failed:', error);
            showToast('An error occurred. Please try again later.', false, loginUser);
        }

    }
    const handleLogin = async (e) => {
        // Perform login logic here (e.g., send data to a server)
        e.preventDefault();
        console.log(formData);
        loginUser(formData, navigate)
    }

    return (
        <div className='flex items-center justify-center min-h-screen overflow-hidden bg-gray-100'>
            <div className="absolute bottom-4 right-4">
                {toast}
            </div>
            <div className="relative max-w-xl">
                <div className="blur-3xl animation-delay-500 animate-bounce-from-left absolute -left-40 -top-5 w-64 h-64 rounded-full bg-[#202A5D] transform mix-blend-multiply filter opacity-70"></div>
                <div className="blur-2xl animate-bounce absolute -bottom-20 left-1/2 w-96 h-96 rounded-full bg-[#EC4C60] transform mix-blend-multiply filter  opacity-70"></div>

                {/* <img className="absolute inset-x-auto z-0 hidden w-auto h-screen sm:block scale" src={bg} alt="background" /> */}

                <div className="relative z-10 p-8 m-6 bg-white rounded-md shadow-2xl dark:text-gray-100 dark:bg-gray-900 w-96">
                    <div className='text-sm'>
                        <Link to="/">
                            {isDarkMode ? (

                                <img className="w-auto h-32 mx-auto mb-6" src={myLogoDark} alt="Terrainet Logo" />
                            ) : (
                                <img className="w-auto h-32 mx-auto mb-6" src={myLogo} alt="Terrainet Logo" />

                            )}
                        </Link>
                        <h2 className="mb-2 text-xl font-semibold dark:text-white">Log in to your account</h2>
                        <p>D&apos;ont have an account ? <Link to="/register" className="text-blue-500 hover:underline pointer" href="">Register</Link> for free.</p>
                        <p></p>
                    </div>
                    <form className='mt-4 space-y-6'>
                        <FormField
                            id="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={fieldErrors.email}
                        />
                        <FormField
                            id="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={fieldErrors.password}
                        />
                        <div>
                            <button
                                type="submit"
                                className="flex justify-center w-full px-3 py-3 text-sm font-semibold leading-6 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                onClick={handleLogin}
                            >
                                Log in
                            </button>
                        </div>
                        {/* Provider Buttons */}
                        <div className='flex justify-center space-x-2'>

                            <button
                                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                type="button"
                                onClick={() => handleProviderLogin('Google')}
                            >
                                <FaGoogle />
                            </button>
                            <button
                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                type="button"
                                onClick={() => handleProviderLogin('Facebook')}
                            >
                                <FaFacebookF />
                            </button>
                            {/* <button
                                className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
                                type="button"
                                onClick={() => handleProviderLogin('GitHub')}
                            >
                                <FaGithubAlt />
                            </button> */}
                        </div>
                    </form>
                    {/* Display validation message if present */}
                    {/* {validationMsg && <div className="mt-2 text-center text-red-800">{validationMsg}</div>} */}

                </div>
            </div>
        </div>
    )
};


Login.propTypes = {

};


export default Login;
