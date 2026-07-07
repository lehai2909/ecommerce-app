import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import "./Header.css";

function Header({ showSearchButton = false, showProductsButton = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUser = () => {
      getCurrentUser()
        .then((user) => {
          setUserEmail(user.signInDetails?.loginId || user.username);
        })
        .catch(() => {
          setUserEmail("");
        });
    };

    fetchUser();
    window.addEventListener("user_auth_change", fetchUser);
    return () => window.removeEventListener("user_auth_change", fetchUser);
  }, []);

  const cartItemsCount = (items || []).reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.dispatchEvent(new Event("user_auth_change"));
      navigate("/login");
    } catch (error) {
      console.error("error signing out: ", error);
    }
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleGoToSearch = () => {
    navigate("/search");
  };

  const handleGoToProducts = () => {
    navigate("/products");
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };


  const isHomePage = location.pathname === "/";

  return (
    <div className="header-wrapper">
      <header className="main-header">
        <div className="logo" onClick={handleGoToHome}>
          <span className="logo-text">AG</span>
          <span className="brand-name">Ecommerce</span>
        </div>

        <nav className="nav-actions">
          {!isHomePage && (
            <button onClick={handleGoToHome} className="nav-link">
              Home
            </button>
          )}
          {showProductsButton && (
            <button onClick={handleGoToProducts} className="nav-link">
              Shop
            </button>
          )}
          {showSearchButton && (
            <button onClick={handleGoToSearch} className="nav-link">
              Search
            </button>
          )}
        </nav>

        <div className="header-right">
          {userEmail && (
            <div className="user-profile">
              <div className="user-avatar" title={userEmail}>
                {userEmail[0].toUpperCase()}
              </div>
              <span className="user-display-email">{userEmail}</span>
            </div>
          )}

          <button onClick={handleGoToCart} className="cart-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartItemsCount > 0 && <span className="cart-dot">{cartItemsCount}</span>}
          </button>

          {userEmail && (
            <button onClick={handleLogout} className="logout-btn">
              Sign Out
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;



