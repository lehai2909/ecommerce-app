import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      window.dispatchEvent(new Event("user_auth_change"));
      navigate("/products");
    } else {
      alert("Please enter your email");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to Ecommerce</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
