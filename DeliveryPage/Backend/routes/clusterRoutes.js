import express from "express";
import { clusterOrders } from "../services/clusteringService.js";
const router = express.Router();

router.post("/assign-orders", async (req, res) => {
    try {
        await clusterOrders();
        res.status(200).json({ message: "✅ Orders clustered and assigned." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
