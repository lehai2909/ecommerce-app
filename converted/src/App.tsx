import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Products from "./pages/Products";
import { ProtectedRouteProps } from "./types";
import "./App.css";

// Protected Route component
function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const isLoggedIn: boolean = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
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
    </Routes>
  );
}

export default App;

