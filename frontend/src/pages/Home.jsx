import React from "react";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import productsData from "../data/products.json";
import "./Home.css";

function Home() {
  const { addItem } = useCart();

  const handleAddToCart = (item) => {
    addItem(item);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Welcome to Our Store</h1>
        <div className="cosmetics-grid">
          {productsData.map((product) => (
            <div key={product.id} className="cosmetic-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="home-actions">
          <p>Discover our amazing products today!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
