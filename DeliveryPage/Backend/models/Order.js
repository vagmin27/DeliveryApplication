import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    lat: Number,
    lon: Number,
    address: String,
    items: [String],
    status: {
        type: String,
        enum: ["pending", "confirmed", "assigned", "out_for_delivery", "delivered"],
        default: "pending",
    },
    cluster: { type: Number },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Delivery" },
    trackingId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
