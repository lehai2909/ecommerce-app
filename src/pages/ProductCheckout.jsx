import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "./ProductCheckout.css";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDisplay = () => {
  const { items, totalAmount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const session = await response.json();
      // Redirect to Stripe Checkout page
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  const tax = totalAmount * 0.08;
  const grandTotal = totalAmount + tax;

  return (
    <div className="checkout-page">
      <Header showBackButton={true} />
      <div className="checkout-container">
        <div className="checkout-content">
          <h1>Order Summary</h1>
          
          <div className="order-items">
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="quantity-section">
                    <span className="label">Quantity:</span>
                    <span className="quantity">{item.quantity}</span>
                  </div>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            {items.length === 0 && <p>Your cart is empty.</p>}
          </div>

          {items.length > 0 && (
            <>
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleCheckout} className="checkout-button">
                Proceed to Payment
              </button>
            </>
          )}
          
          <button onClick={() => navigate("/cart")} className="continue-shopping">
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

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
