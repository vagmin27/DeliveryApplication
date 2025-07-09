import { useEffect } from 'react';
import ProductCard from './ProductCard';

// Import all 16 images
import img1 from '../assets/img1.jpg';
import img10 from '../assets/img10.jpg';
import img11 from '../assets/img11.jpg';
import img12 from '../assets/img12.jpg';
import img13 from '../assets/img13.jpg';
import img14 from '../assets/img14.jpg';
import img15 from '../assets/img15.jpg';
import img16 from '../assets/img16.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';

// Create an array of image imports
const imageList = [
    img1, img2, img3, img4,
    img5, img6, img7, img8,
    img9, img10, img11, img12,
    img13, img14, img15, img16
];

const Home = () => {
    // ✅ Check token on page load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        alert("You must be logged in to view this page.");
        window.location.href = "http://localhost:5173"; // change to your loginPage URL
        }
    }, []);

    // Generate product data
    const products = imageList.map((img, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        price: (Math.random() * 100000 + 100).toFixed(2),
        image: img,
        description: `This is a detailed description of Product ${index + 1}. It offers great value and features, making it a popular choice among customers.`,
    }));

    return (
        <main className="home">
        <section className="intro">
            <h1>Welcome to SmartShip</h1>
            <p>Explore our exclusive deals and new arrivals.</p>
        </section>

        <section className="products-grid">
            {products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </section>
        </main>
    );
};

export default Home;
