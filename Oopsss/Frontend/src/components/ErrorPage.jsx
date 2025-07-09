import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const ErrorPage = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();

    return (
        <div className={`flex flex-col items-center justify-center h-screen transition duration-500 px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            <img
                src="/dog.png"
                alt="Error Dog"
                className="w-60 h-auto mb-6 animate-pulse"
            />
            <h1 className="text-3xl font-bold mb-2">UH-OH</h1>
            <p className="text-xl mb-4">
                Something went wrong at our end.
            </p>
            <button
                onClick={() => navigate('/')}
                className={`py-2 px-6 rounded-md font-semibold transition duration-300 shadow ${
                darkMode
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
            >
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;