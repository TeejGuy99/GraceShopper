import React from "react";
import { Link } from "react-router-dom";
import "../style/HomePage.scss";

const HomePage = (props) => {
  const { getUserToken, isItemAvailable, isUserAdmin } = props;
  return (
    <div className="hero-container">
      <div className="slogan-wrapper">
        <div className="slogan-container">
          <div className="slogan-text">
            <p>LIGHT YOUR FUR WITH SCENTS</p>
          </div>
          <div className="shop-now-btn">
            <Link to="all-products">
              <button className="shop-btn">SHOP NOW</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
