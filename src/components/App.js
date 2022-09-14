import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import "../style/App.css";
import {
  AdBanner,
  AdminPage,
  HomePage,
  ItemCard,
  LoginForm,
  Header,
} from "./index";
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
    console.log("Users: ");
    console.log(getAllUsers());

    console.log("Products: ");
    console.log(getAllProducts());
  }, []);

  return (
    <div className="app-container">
      {/* <Header /> */}
      <AdBanner />
      <AdminPage
        isUserAdmin={isUserAdmin}
        getUserCartItems={getUserCartItems}
        isLoggedIn={isLoggedIn}
        setItemAvailable={setItemAvailable}
      />
      <HomePage getUserToken={getUserToken} isItemAvailable={isItemAvailable} />
      <ItemCard isItemAvailable={isItemAvailable} />
      <LoginForm
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        setUserToken={setUserToken}
        getUserToken={getUserToken}
        setUserAdmin={setUserAdmin}
      />
    </div>
  );
};

export default App;
