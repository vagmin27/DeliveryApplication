import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String,
    courier: String,
    contact: String,
    eta: Date,
    updates: [String],
    timeline: [
        {
        title: String,
        date: String,
        icon: String
        }
    ],
    location: {
        lat: Number,
        lng: Number
    }
}, { timestamps: true });

export default mongoose.model('Delivery', deliverySchema);
