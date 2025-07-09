import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';

// 👇 Add this
import ErrorPage from '../../../Oopsss/src/components/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />

        {/* Fallback */}
        <Route path="*" element={<ErrorPage darkMode={false} setDarkMode={() => {}} />} />
      </Routes>
    </Router>
  );
}

export default App;
