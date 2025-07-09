const Navbar = () => {
    const handleLogout = () => {
        localStorage.clear(); // ❌ Clear token and user info
        alert("Logged out successfully!");
        window.location.href = "http://localhost:5173"; // 🔁 Redirect to login page
    };

    return (
        <header className="navbar">
        <div className="navbar-links">
            <a href="#orders">Orders</a>
            <a href="#cart">Cart</a>
            <a href="#" onClick={handleLogout} style={{ marginLeft: '30px', cursor: 'pointer' }}>
            Logout
            </a>
        </div>
        </header>
    );
};

export default Navbar;
