export default function PackageInfoCard() {
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white shadow rounded-xl p-4 transition-all">
            <h2 className="text-lg font-semibold mb-2">📦 Package Summary</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Status:</strong> <span className="bg-yellow-100 dark:bg-yellow-400 dark:text-black px-2 py-1 rounded-full text-sm">In Transit</span></li>
                <li><strong>Courier:</strong> Raju (Delivery Agent)</li>
                <li><strong>Contact:</strong> +91-98765XXXXX</li>
                <li><strong>ETA:</strong> June 18, 2025 — By 8 PM</li>
            </ul>
        </div>
    );
}