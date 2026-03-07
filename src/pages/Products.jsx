import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { products as mockProducts } from "../data/products";
import Header from "../components/Header";
import Product from "../components/Product";
import "./Products.css";

function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(mockProducts);
    }
  }, [searchQuery]);

  const handleBackToSearch = () => {
    navigate("/search");
  };

  return (
    <div className="products-container">
      <Header showSearchButton={true} />
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
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
