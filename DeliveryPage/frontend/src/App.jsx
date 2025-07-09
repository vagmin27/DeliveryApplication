import Header from './components/Header';
import MapView from './components/MapView';
import PackageInfoCard from './components/PackageInfoCard';
import Timeline from './components/Timeline';
import UpdatesPanel from './components/UpdatesPanel';

export default function App() {
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