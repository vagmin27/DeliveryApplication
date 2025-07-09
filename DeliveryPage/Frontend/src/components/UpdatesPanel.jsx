export default function UpdatesPanel() {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white shadow rounded-xl p-4 transition-all">
            <h2 className="text-lg font-semibold mb-2">📢 Real-Time Updates</h2>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>[09:00 AM] Raju picked up your package</li>
                <li>[10:15 AM] En route to your location</li>
                <li className="italic text-gray-400">Waiting for new updates...</li>
            </ul>
        </div>
    );
}