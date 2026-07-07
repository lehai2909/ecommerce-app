import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Product.css";

function Product({ product }) {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError
    ? "https://via.placeholder.com/500x500?text=TV+Image"
    : product.image;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={product.name} onError={handleImageError} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="add-to-cart-button" onClick={() => addItem(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
