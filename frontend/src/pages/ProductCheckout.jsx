import React, { useState } from "react";
import Header from "../components/Header";
import "./ProductCheckout.css";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCheckout() {
  const { items, totalAmount } = useCart();
  const navigate = useNavigate();

  const [mobilePhone, setMobilePhone] = useState("");
  const [userNote, setUserNote] = useState("");

  const handleCheckout = async () => {
    console.log("Checkout Details:");
    console.log("Mobile Phone:", mobilePhone);
    console.log("User Note:", userNote);
    console.log("Items:", items);
    alert("Order submitted! Check console for details.");
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
              <div className="checkout-form" style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <label htmlFor="mobilePhone" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Mobile Phone</label>
                  <input 
                    type="text" 
                    id="mobilePhone" 
                    value={mobilePhone} 
                    onChange={(e) => setMobilePhone(e.target.value)} 
                    placeholder="Enter your mobile phone"
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <label htmlFor="userNote" style={{ fontWeight: 'bold', marginBottom: '5px' }}>User Note</label>
                  <textarea 
                    id="userNote" 
                    value={userNote} 
                    onChange={(e) => setUserNote(e.target.value)} 
                    placeholder="Any special requests or delivery notes?"
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '80px', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <button onClick={handleCheckout} className="checkout-button">
                Submit Order
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
}
