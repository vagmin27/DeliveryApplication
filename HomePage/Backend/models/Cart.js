// homepage/backend/models/Cart.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
});

export default mongoose.model('Cart', cartSchema);
