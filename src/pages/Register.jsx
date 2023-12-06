// import PropTypes from 'prop-types';

import { useState } from "react";
import { FaFacebookF, FaGithubAlt, FaGoogle } from "react-icons/fa";
// import bg from '/courbe2.svg'
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import myLogo from '/terrainet-v2-light.svg'
import myLogoDark from '/terrainet-v2-dark.svg'

import CustomToast from "../components/customToast";
import FormField from "../components/FormField";

const Register = () => {
    const [
        isDarkMode,
        //  setIsDarkMode
    ] = useDarkMode();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [toast, setToast] = useState(null);
    let navigate = useNavigate();

    const showToast = (message, success = false, onTryAgain = null) => {
        setToast(
            <CustomToast
                message={message}
                onClose={() => setToast(null)}
                onTryAgain={onTryAgain}
                success={success}
            // forceShow={true}
            />
        )
    }

    //! TODO
    const handleProviderLogin = (provider) => {
        console.log(`Logging in with ${provider}`);
    }

    function handleChange(e) {
        const { id, value } = e.target
        setFormData(
            {
                ...formData,
                [id]: value
            })
        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [id]: ""
        }))
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

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Please fill in all the required fields.');
            return;
        }

        try {
            // Perform login logic here (e.g., send data to a server)
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
            if (res.ok) {
                setToast('Account created');
                navigate('/login');
            } else {
                console.error('Error during registration:', data.error);
                showToast('Uh, oh! Something went wrong. Please try again.');
                // setToast('Registration failed. Please check the form.', false, handleTryAgain);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            showToast('An error occurred. Please try again later.', false, handleRegister);
            // showToast('An error occurred. Please try again later.', false, handleTryAgain);
        }
    };

    return (

        <div className='relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden'>
            <div className="absolute bottom-4 right-4">
                {toast}
            </div>
            <div className="relative max-w-xl">
                <div className="blur-3xl animation-delay-500 animate-bounce-from-left absolute -left-40 -top-5 w-64 h-64 rounded-full bg-[#202A5D] transform mix-blend-multiply filter opacity-70"></div>
                <div className="blur-2xl animate-bounce absolute -bottom-20 left-1/2 w-96 h-96 rounded-full bg-[#EC4C60] transform mix-blend-multiply filter  opacity-70"></div>

                {/* <img className="hidden sm:block scale h-screen absolute inset-x-auto w-auto z-0" src={bg} alt="background" /> */}
                <div className="relative z-10 dark:text-gray-100 bg-white dark:bg-gray-900 p-8 shadow-md rounded-md w-96">
                    <div className='text-sm'>
                        <Link to="/">
                            {isDarkMode ? (

                                <img className="mx-auto w-auto h-32 mb-6" src={myLogoDark} alt="Terrainet Logo" />
                            ) : (
                                <img className="mx-auto w-auto h-32 mb-6" src={myLogo} alt="Terrainet Logo" />

                            )}
                        </Link>
                        <h2 className="font-semibold text-xl mb-2">Create a new account</h2>
                        <p>You already have an account ? <Link to="/login" className="text-blue-500 hover:underline pointer" href="">Login</Link> to your account.</p>
                    </div>
                    <form className='space-y-6 mt-4'>
                        <FormField
                            id="firstName"
                            label="First Name"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={fieldErrors.firstName}
                        />
                        <FormField
                            id="lastName"
                            label="Last Name"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={fieldErrors.lastName}
                        />
                        <FormField
                            id="username"
                            label="Username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            error={fieldErrors.username}
                        />
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
                        <FormField
                            id="passwordConfirmation"
                            label="Password Confirmation"
                            type="password"
                            value={formData.passwordConfirmation}
                            onChange={handleChange}
                            error={fieldErrors.passwordConfirmation}
                        />

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                onClick={handleRegister}
                            >
                                Create account
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
