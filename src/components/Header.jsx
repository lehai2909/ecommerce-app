import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

function Header({ showSearchButton = false, showProductsButton = false }) {
  const navigate = useNavigate();
  const { items } = useCart();

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    // Trigger cart reload for the next user/guest
    window.dispatchEvent(new Event("user_auth_change"));
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

  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="header">
      <h1>Ecommerce Store</h1>
      <div className="user-info">
        <span>Welcome, {userEmail}</span>
        {showSearchButton && (
          <button onClick={handleGoToSearch} className="action-button">
            Search
          </button>
        )}
        {showProductsButton && (
          <button onClick={handleGoToProducts} className="action-button">
            All Products
          </button>
        )}
        <button onClick={handleGoToCart} className="cart-icon-button" aria-label="Cart">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="cart-icon"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;



