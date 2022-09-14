import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../style/App.css";
import { AdBanner, ItemCard, Header } from "./index";
import { Register, AdminPage, HomePage, Login } from "../pages";
import { getAllUsers, getAllProducts } from "../api";

const App = () => {
  //UseState for various properties
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [getUserToken, setUserToken] = useState("");
  const [getUserCartItems, setUserCartItems] = useState([]);
  const [isItemAvailable, setItemAvailable] = useState(true);
  const [isUserAdmin, setUserAdmin] = useState(false);

  //Helper Functions

  //Reset all user state on logout
  // const resetUserStates = () => {
  //   setUserToken(localStorage.clear());
  //   setLoggedIn(false);
  //   setUserCartItems([]);
  // }

  useEffect(() => {
    console.log(getAllUsers());
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header isUserAdmin={isUserAdmin} />
        {/* <AdBanner/> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomePage
                getUserToken={getUserToken}
                isItemAvailable={isItemAvailable}
              />
            }
          />

          <Route
            exact
            path="/login"
            element={
              <Login
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                setUserToken={setUserToken}
                getUserToken={getUserToken}
                setUserAdmin={setUserAdmin}
              />
            }
          />
          <Route exact path="/register" element={<Register />} />

          <Route
            exact
            path="/admin"
            element={
              isUserAdmin ? (
                <AdminPage
                  isUserAdmin={isUserAdmin}
                  getUserCartItems={getUserCartItems}
                  isLoggedIn={isLoggedIn}
                  setItemAvailable={setItemAvailable}
                />
              ) : null
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
