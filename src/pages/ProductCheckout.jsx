import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "./ProductCheckout.css";

const PRODUCT = {
  id: 1,
  name: "Stubborn Attachments",
  price: 20.0,
  image: "https://i.imgur.com/EHyR2nP.png",
  description: "A thoughtful exploration of values and meaning",
};

const ProductDisplay = () => (
  <div className="checkout-page">
    <Header showBackButton={true} />
    <div className="checkout-container">
      <div className="checkout-content">
        <h1>Order Summary</h1>
        
        <div className="order-items">
          <div className="order-item">
            <img
              src={PRODUCT.image}
              alt={PRODUCT.name}
              className="item-image"
            />
            <div className="item-details">
              <h3>{PRODUCT.name}</h3>
              <p className="item-description">{PRODUCT.description}</p>
              <div className="quantity-section">
                <span className="label">Quantity:</span>
                <span className="quantity">1</span>
              </div>
            </div>
            <div className="item-price">
              ${PRODUCT.price.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${PRODUCT.price.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${(PRODUCT.price * 0.08).toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${(PRODUCT.price * 1.08).toFixed(2)}</span>
          </div>
        </div>

        <form
          action="http://localhost:4242/create-checkout-session"
          method="POST"
          className="checkout-form"
        >
          <button type="submit" className="checkout-button">
            Proceed to Payment
          </button>
        </form>
        
        <button className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
);

const Message = ({ message }) => (
  <div className="checkout-page">
    <Header showBackButton={true} />
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="message-box">
          <p className="message-text">{message}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function ProductCheckout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("✓ Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready.",
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
