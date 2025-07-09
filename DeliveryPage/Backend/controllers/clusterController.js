import { clusterOrders } from "../services/clusteringService.js";

export const runClustering = async (req, res) => {
    try {
        await clusterOrders();
        res.json({ message: "✅ Orders clustered and assigned!" });
    } catch (err) {
        console.error("❌ Clustering error:", err.message);
        res.status(500).json({ message: err.message });
    }
};
