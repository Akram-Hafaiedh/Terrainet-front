import PropTypes from "prop-types";
import { FaMoon } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";
import { BsSunFill } from "react-icons/bs";

function DarkModeButton({ onDarkMode, showLabel }) {
    const [isDarkMode, setIsDarkMode] = useDarkMode();
    const handleToggleDark = () => {
        setIsDarkMode(!isDarkMode)
        localStorage.setItem('darkMode', isDarkMode);
        // Call the provided onClick callback, if any
        if (onDarkMode) {
            onDarkMode(!isDarkMode); // Passes the new mode as an argument
        }
    }
    return (
        <button
            className="flex justify-between flex-row items-center text-center bg-transparent "
            type="button"
            onClick={handleToggleDark}
        >   {isDarkMode ? (
            <>
                {showLabel && <span className="text-black mr-2">Light</span>}
                <BsSunFill className="text-yellow-500 rounded text-center" />
            </>
        ) : (
            <>
                { showLabel && <span className="mr-2">Dark</span>}
                <FaMoon className="text-black dark:text-white rounded text-center" />
            </>
        )}
            {/* {children || (!isDarkMode ? <FaMoon className="text-black" /> : <BsSunFill />)} */}
        </button>
    )
}


DarkModeButton.propTypes = {
    onDarkMode: PropTypes.func,
    // children: PropTypes.node.isRequired,
    showLabel: PropTypes.bool,
};
export default DarkModeButton;