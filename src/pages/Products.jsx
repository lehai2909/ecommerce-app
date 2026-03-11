import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Product from "../components/Product";
import "./Products.css";

function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (searchQuery) {
          const filtered = data.filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
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
