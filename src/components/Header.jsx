import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ showSearchButton = false, showProductsButton = false }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleGoToSearch = () => {
    navigate("/search");
  };

  const handleGoToProducts = () => {
    navigate("/products");
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
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;



