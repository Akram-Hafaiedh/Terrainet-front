import { useEffect, useState } from "react";

function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);
    // const colorTheme = theme === 'dark' ? 'light' : 'dark'
    useEffect(() => {
        // const storedTheme = localStorage.getItem('theme');

        if (isDarkMode) {
            // setIsDarkMode(storedTheme === 'dark')
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', true)
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }

    }, [isDarkMode])
    return [isDarkMode, setIsDarkMode];
}

export default useDarkMode;