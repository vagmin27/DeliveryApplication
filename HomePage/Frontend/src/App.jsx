import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// your existing imports here

// 👇 Add this
import ErrorPage from '../../../Oopsss/src/components/ErrorPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<YourMainPage />} />
        {/* Add other defined routes here */}

        {/* Fallback */}
        <Route path="*" element={<ErrorPage darkMode={false} setDarkMode={() => {}} />} />
      </Routes>
    </Router>
  );
}
