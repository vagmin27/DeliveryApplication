

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img
                src={product.image}
                alt={product.name}
                className="product-image"
            />
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">₹{product.price}</div>
                <button className="buy-button">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
