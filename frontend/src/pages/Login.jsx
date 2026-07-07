import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, getCurrentUser } from "aws-amplify/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to products
    getCurrentUser()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        // No user logged in, stay on login page
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      if (isSignedIn) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        window.dispatchEvent(new Event("user_auth_change"));
        navigate("/");
      }
    } catch (error) {
      if (error.name === "UserAlreadyAuthenticatedException") {
        window.dispatchEvent(new Event("user_auth_change"));
        navigate("/");
      } else {
        console.error("error signing in", error);
        alert(error.message || "Failed to sign in");
      }
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
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
