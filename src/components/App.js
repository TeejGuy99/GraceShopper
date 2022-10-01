import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../style/App.css";
import { AdBanner, ItemCard, Header, AdminUsersTable } from "./index";
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
  AdminUsers,
  AdminOrders,
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
          setUserToken={setUserToken}
          setLoggedIn={setLoggedIn}
          setUserAdmin={setUserAdmin}
          setUserId={setUserId}
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
                isUserAdmin={isUserAdmin}
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
              isLoggedIn ? <UserProfile userId={userId} /> : null
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
              // isUserAdmin ? (
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
              // ) : null
            }
          />

          <Route
            exact
            path="/admin/users"
            element={
              // isUserAdmin ? 
              <AdminUsers /> 
            // : null
          }
          />

          <Route
            exact
            path="/admin/orders"
            element={
              // isUserAdmin ? 
              <AdminOrders /> 
              // : null
            }
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
