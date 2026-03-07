import { useNavigate } from "react-router-dom";
// import { HeaderProps } from "../types";
import "./Header.css";

interface MyButtonProps {
    /** The text to display inside the button */
    title?: string;
    /** Whether the button can be interacted with */
    showBackButton?: boolean;
  }

function Header({ showBackButton = false }: MyButtonProps) {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleBackToSearch = (): void => {
    navigate("/search");
  };

  const userEmail: string | null = localStorage.getItem("userEmail");

  return (
    <div className="header">
      <h1>Ecommerce Store</h1>
      <div className="user-info">
        <span>Welcome, {userEmail}</span>
        {showBackButton && (
          <button onClick={handleBackToSearch} className="back-button">
            Back to Search
          </button>
        )}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;



