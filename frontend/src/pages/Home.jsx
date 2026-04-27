import React from "react";
import Header from "../components/Header";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <Header showProductsButton={true} showSearchButton={true} />
      <div className="home-content">
        <h1>Welcome to Our Store</h1>
        <div className="hero-video">
          <h2>Featured Experience: Pinky Pigs</h2>
          <video
            controls
            autoPlay
            muted
            loop
            width="100%"
            height="auto"
            style={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
          >
            <source src="/video/pinky-pigs.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="home-actions">
          <p>Discover our amazing products today!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
