import { useState } from 'react';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import './LoginSignup.css';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiBase = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = action === "Login" ? "login" : "register";
    const payload = action === "Login"
      ? { email, password }
      : { name, email, password, role };

    try {
      const res = await fetch(`${apiBase}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          setError(data.errors[0].msg);
        } else {
          setError(data.message || "Something went wrong");
        }
        setLoading(false);
        return;
      }

      if (action === "Login") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        window.location.href = "http://localhost:5174"; // URL of HomePage/frontend
      } else {
        alert("Registration successful! Please login.");
        setAction("Login");
        setName("");
        setEmail("");
        setPassword("");
        setRole("customer");
      }

    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="background"></div>

      <div className="login-signup-page">
        <div className="left-section">
          <h1>Fast. Secure. Reliable.</h1>
          <p>Welcome to <b>SmartShip</b> – your trusted delivery partner.</p>
          <ul>
            <li>📦 Track and manage your deliveries in real time.</li>
            <li>⚡ Delivery agents get instant task notifications.</li>
            <li>🌍 Serving all major cities with optimized routes.</li>
          </ul>
          <p>Not on board yet?</p>
          <button onClick={() => setAction("Sign Up")}>Join Now</button>
        </div>

        <div className="right-section">
          <h2>{action === "Login" ? "Sign In" : "Sign Up"}</h2>
          <form className="form" onSubmit={handleSubmit}>
            {action === "Sign Up" && (
              <>
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <select
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="customer">Customer</option>
                  <option value="agent">Delivery Agent</option>
                </select>
              </>
            )}

            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />

            {action === "Login" && (
              <div className="forgot-password">
                Forgot password? <span style={{ cursor: "pointer" }}>Click here</span>
              </div>
            )}

            {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Processing..." : action === "Login" ? "LOGIN" : "REGISTER"}
            </button>

            <div className="social-login">
              Or Sign in with social platforms
              <div className="icons">
                <FaFacebookF className="icon" />
                <FaTwitter className="icon" />
                <FaGoogle className="icon" />
                <FaLinkedinIn className="icon" />
              </div>
            </div>

            <div className="toggle-action">
              {action === "Login" ? (
                <p>Don't have an account? <span onClick={() => setAction("Sign Up")}>Sign Up</span></p>
              ) : (
                <p>Already have an account? <span onClick={() => setAction("Login")}>Login</span></p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
