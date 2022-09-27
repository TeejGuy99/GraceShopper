import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../style/App.css";
import { AdBanner, ItemCard, Header } from "./index";
import {
  Register,
  AdminPage,
  HomePage,
  Login,
  AllProductsPage,
  CandlesPage,
  WaxMeltsPage,
  UserProfile,
  Cart,
  AdminProducts,
} from "../pages";
import {
  getAllUsers,
  getAllOrders,
  getAllProducts,
  getAllProductPhotos,
  logInUser,
  registerUser,
  makeUserAdmin,
  getAllGuests,
  getAllCarts,
} from "../api";

const App = () => {
  //UseState for various properties
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [getUserToken, setUserToken] = useState("");
  const [getUserCartItems, setUserCartItems] = useState([]);
  const [isItemAvailable, setItemAvailable] = useState(true);
  const [isUserAdmin, setUserAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [guestId, setGuestId] = useState(0);
  const [userId, setUserId] = useState(null);

  //Helper Functions

  //Reset all user state on logout
  // const resetUserStates = () => {
  //   setUserToken(localStorage.clear());
  //   setLoggedIn(false);
  //   setUserCartItems([]);
  // }

  const runTests = () => {
    console.log("users: ");
    console.log(getAllUsers());
    console.log("guests: ");
    console.log(getAllGuests());
    console.log("carts: ");
    console.log(getAllCarts());
    console.log("products: ");
    console.log(getAllProducts());
    // console.log("reviews: ");
    // console.log(getReviews());
    console.log("photos: ");
    console.log(getAllProductPhotos());
    console.log("orders");
    console.log(getAllOrders());
    console.log("attempting to sign in as tim@seed.com: ");
    console.log(logInUser("tim@seed.com", "tim01"));
    console.log(
      "attempting to create a new user TeejGuy with password of password: "
    );
    console.log(registerUser("TeejGuy", "password"));
    console.log("attempting to make TeejGuy an admin: ");
    console.log(makeUserAdmin(6));
  };

  useEffect(() => {
    // runTests();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header 
		  isUserAdmin={isUserAdmin}
		  isLoggedIn={isLoggedIn}
		  getUserCartItems={getUserCartItems}
		  userId={userId}
		  guestId={guestId}
		  getUserToken={getUserToken}
		  setUserCartItems={setUserCartItems}
		/>
        {/* <AdBanner/> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomePage
                getUserToken={getUserToken}
                isItemAvailable={isItemAvailable}
                isUserAdmin={isUserAdmin}
              />
            }
          />
          <Route
            exact
            path="/all-products"
            element={
              <AllProductsPage
                products={products}
                setProducts={setProducts}
                guestId={guestId}
                setGuestId={setGuestId}
                userId={userId}
                getUserToken={getUserToken}
                setUserCartItems={setUserCartItems}
                getUserCartItems={getUserCartItems}
              />
            }
          />
          <Route
            exact
            path="/candles"
            element={
              <CandlesPage
                products={products}
                setProducts={setProducts}
                guestId={guestId}
                setGuestId={setGuestId}
                userId={userId}
                getUserToken={getUserToken}
                setUserCartItems={setUserCartItems}
                getUserCartItems={getUserCartItems}
              />
            }
          />
          <Route
            exact
            path="/wax-melts"
            element={
              <WaxMeltsPage
                products={products}
                setProducts={setProducts}
                guestId={guestId}
                setGuestId={setGuestId}
                userId={userId}
                getUserToken={getUserToken}
                setUserCartItems={setUserCartItems}
                getUserCartItems={getUserCartItems}
              />
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setUserToken={setUserToken}
                setUserAdmin={setUserAdmin}
                setUserId={setUserId}
                setGuestId={setGuestId}
              />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Register
                setLoggedIn={setLoggedIn}
                setUserToken={setUserToken}
                setGuestId={setGuestId}
                setUserId={setUserId}
              />
            }
          />

          <Route
            exact
            path="/profile"
            element={
              isLoggedIn ? <UserProfile isLoggedIn={isLoggedIn} /> : null
            }
          ></Route>

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

          <Route
            exact
            path="/cart"
            element={
              <Cart
                isLoggedIn={isLoggedIn}
                getUserCartItems={getUserCartItems}
                setUserCartItems={setUserCartItems}
                getUserToken={getUserToken}
                userId={userId}
                guestId={guestId}
                setGuestId={setGuestId}
              />
            }
          ></Route>

          <Route
            exact
            path="/admin/products"
            element={
              // isUserAdmin ?
              <AdminProducts
                products={products}
                setProducts={setProducts}
                guestId={guestId}
                setGuestId={setGuestId}
                userId={userId}
                getUserToken={getUserToken}
                setUserCartItems={setUserCartItems}
                getUserCartItems={getUserCartItems}
              />
              // : null
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
