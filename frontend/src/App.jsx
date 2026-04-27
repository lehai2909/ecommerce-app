import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Products from "./pages/Products";
import ProductCheckout from "./pages/ProductCheckout";
import Cart from "./pages/Cart";
import { fetchAuthSession } from "aws-amplify/auth";
import "./App.css";

import { CartProvider } from "./context/CartContext";

// Protected Route component
function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    fetchAuthSession()
      .then((session) => {
        setIsLoggedIn(!!session.tokens?.idToken);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn === null) return <div>Loading...</div>;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <ProductCheckout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
