import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { products as mockProducts } from "../data/products";
import { Product } from "../types";
import Header from "../components/Header";
import "./Products.css";

function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const searchQuery: string = searchParams.get("q") || "";

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery) {
      const filtered: Product[] = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(mockProducts);
    }
  }, [searchQuery]);

  const handleBackToSearch = (): void => {
    navigate("/search");
  };

  return (
    <div className="products-container">
      <Header showBackButton={true} />
      <div className="products-content">
        <h2>
          {searchQuery
            ? `Search Results for "${searchQuery}" (${products.length} products found)`
            : `All Products (${products.length} products)`}
        </h2>
        {products.length === 0 ? (
          <div className="no-results">
            <p>No products found matching your search.</p>
            <button
              onClick={handleBackToSearch}
              className="search-again-button"
            >
              Search Again
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button className="add-to-cart-button">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;



