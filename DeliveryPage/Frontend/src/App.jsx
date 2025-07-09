import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import MapView from './components/MapView';
import PackageInfoCard from './components/PackageInfoCard';
import Timeline from './components/Timeline';
import UpdatesPanel from './components/UpdatesPanel';
import TrackOrder from './pages/TrackOrder';

// 👇 Add this
import { useEffect, useState } from 'react';
import ErrorPage from '../../../Oopsss/src/components/ErrorPage';

function DashboardLayout() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors duration-500">
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2 space-y-6">
          <MapView />
          <Timeline />
        </div>
        <div className="space-y-6">
          <PackageInfoCard />
          <UpdatesPanel />
        </div>
      </main>
    </div>
  );
}

export default function App() {
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
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/track/:trackingId" element={<TrackOrder />} />

        {/* Fallback */}
        <Route
          path="*"
          element={<ErrorPage darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
      </Routes>
    </Router>
  );
}
