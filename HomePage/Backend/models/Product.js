// homepage/backend/models/Product.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    imageUrl: String,
    description: String,
});

export default mongoose.model('Product', productSchema);
