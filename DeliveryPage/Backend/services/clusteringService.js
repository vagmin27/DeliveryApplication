import kmeans from "ml-kmeans";
import DeliveryPartner from "../models/DeliveryPartner.js";
import Order from "../models/Order.js";

// Helper: convert order locations into [lat, lon] vectors
const getOrderVectors = (orders) =>
    orders.map(order => [order.lat, order.lon]);

    // Assign each cluster to a partner (round robin or by availability)
    const assignClustersToPartners = async (clusters, orders, partners) => {
    for (let i = 0; i < clusters.clusters.length; i++) {
        const clusterOrders = orders.filter((_, idx) => clusters.clusters[idx] === i);
        const partner = partners[i % partners.length]; // Simple round robin

        await Promise.all(clusterOrders.map(order => {
        order.cluster = i;
        order.assignedTo = partner._id;
        return order.save();
        }));

        partner.assignedCluster = i;
        partner.assignedOrders = clusterOrders.map(o => o._id);
        await partner.save();
    }
};

export const clusterOrders = async () => {
    const pendingOrders = await Order.find({ status: "confirmed", assignedTo: null });
    if (pendingOrders.length === 0) return;

    const partners = await DeliveryPartner.find({ isOnline: true });
    if (partners.length === 0) throw new Error("No online delivery partners");

    const data = getOrderVectors(pendingOrders);
    const clusters = kmeans(data, Math.min(partners.length, pendingOrders.length)); // Capacitated

    await assignClustersToPartners(clusters, pendingOrders, partners);
};
