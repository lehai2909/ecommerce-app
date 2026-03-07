import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Products from "./pages/Products";
import ProductCheckout from "./pages/ProductCheckout";
import "./App.css";

// Protected Route component
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
        path="/checkout"
        element={
          <ProtectedRoute>
            <ProductCheckout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
