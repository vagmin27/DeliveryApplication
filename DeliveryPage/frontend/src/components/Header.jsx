import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="bg-white dark:bg-gray-800 dark:text-white shadow p-4 flex justify-between items-center transition-all">
            <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                📦 Live Delivery Tracker
            </h1>
            <div className="flex items-center gap-4">
                <span className="text-sm">Order ID: <strong>#DEL-347823</strong></span>
                <button
                onClick={toggleTheme}
                className="text-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gray-100 dark:bg-gray-700 dark:text-yellow-300 text-gray-800 px-3 py-1 rounded-full shadow-sm hover:shadow-lg"
                >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>
        </header>
    );
}