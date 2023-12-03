import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GoX } from "react-icons/go";

function CustomToast({ message, onClose, onTryAgain, success }) {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // if (!forceShow) {
        //     return;
        // }
        const timer = setTimeout(() => {
            // setVisible(false);
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose])

    // if (!forceShow) {
    //     return null;
    // }
    const handleTryAgainClick = () => {
        onTryAgain();
        setVisible(false);
    }

    return (
        <div className={` ${visible ? 'animate-move-up-right' : 'opacity-0'}
        bg-white z-20 right-4 p-4 border boder-gray-300 w-full  rounded-md shadow-md relative
        `}
        >
            <div className="flex items-center justify-between space-x-5">
                <div>
                    <p className="text-sm font-medium text-gray-800">{message}</p>
                    {success ? (
                        <p className="text-sm  text-green-600">Registration successful!</p>
                    ) : (
                        <p className="text-sm  text-red-600">There was a problem with your request</p>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {!success && (
                        <button
                            className="text-sm font-medium mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                            onClick={handleTryAgainClick}
                        >
                            Try Again
                        </button>
                    )}
                    <button
                        className="absolute right-1 top-1 text-gray-600 hover:text-gray-500"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <GoX className="text-xl font-bold" />
                    </button>

                </div>
            </div>
        </div >

    )
}

CustomToast.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
    // forceShow: PropTypes.bool,
    onTryAgain: PropTypes.func,
    success: PropTypes.string,
};

export default CustomToast;
