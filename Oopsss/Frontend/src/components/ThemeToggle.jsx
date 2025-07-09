
const ThemeToggle = ({ darkMode, setDarkMode }) => {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 text-sm text-black dark:text-white px-3 py-1 rounded-md transition duration-300 shadow"
            >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
    );
};

export default ThemeToggle;