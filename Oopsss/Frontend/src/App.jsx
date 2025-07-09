import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<ErrorPage darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
      </Routes>
    </Router>
  );
};

export default App;