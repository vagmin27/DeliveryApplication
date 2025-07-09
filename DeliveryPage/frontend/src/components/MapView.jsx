export default function MapView() {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white shadow rounded-xl p-4 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-2">📍 Current Location</h2>
            <div className="h-96 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-300">Map Loading / Placeholder</span>
            </div>
        </div>
    );
}