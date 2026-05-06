
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductCheckout from "./pages/ProductCheckout";
import Cart from "./pages/Cart";
import "./App.css";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProductCheckout />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
