import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const cartItemsCount = (items || []).reduce((acc, item) => acc + item.quantity, 0);

  const handleGoToHome = () => {
    navigate("/");
  };



  const handleGoToCart = () => {
    navigate("/cart");
  };


  const isHomePage = location.pathname === "/";

  return (
    <div className="header-wrapper">
      <header className="main-header">
        <div className="logo" onClick={handleGoToHome} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <img src="/images/ocean-logo.png" alt="Ocean Store Logo" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
          <span className="brand-name" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0ea5e9' }}>Ocean Store</span>
        </div>

        <nav className="nav-actions">
          {!isHomePage && (
            <button onClick={handleGoToHome} className="nav-link">
              Home
            </button>
          )}

        </nav>

        <div className="header-right">
          <button onClick={handleGoToCart} className="cart-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartItemsCount > 0 && <span className="cart-dot">{cartItemsCount}</span>}
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;



