import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import "./Cart.css";

function Cart() {
  const { items, totalAmount, removeItem, addItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const hasItems = items.length > 0;

  return (
    <div className="cart-container">
      <Header showSearchButton={true} showProductsButton={true} />
      <div className="cart-content">
        <h2>Your Shopping Cart</h2>
        {!hasItems && (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button onClick={() => navigate("/products")} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        )}
        {hasItems && (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => removeItem(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addItem(item)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="total">
                <span>Total Amount:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button onClick={clearCart} className="clear-btn">
                  Clear Cart
                </button>
                <button onClick={handleCheckout} className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
