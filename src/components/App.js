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
	CartPage,
	WaxMeltsPage,
	CandlesPage
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
	getUserInfo
} from "../api";

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

	const getCart = () => {
		getUserInfo(3)
		.then((result) => {
			console.log(result);
			setUserCartItems(result.cart);
		})
		.catch(console.error)
	}

	useEffect(() => {
		// runTests();
		getCart();
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
					<Route exact path="/all-products" element={<AllProductsPage isLoggedIn={isLoggedIn} setUserCartItems={setUserCartItems} />} />
					<Route exact path="/cart" element={<CartPage isLoggedIn={isLoggedIn} getUserCartItems={getUserCartItems} logInUser={logInUser} getUserInfo={getUserInfo}/>} />
					<Route exact path="/candles" element={<CandlesPage isLoggedIn={isLoggedIn} setUserCartItems={setUserCartItems} />} />
					<Route exact path="/wax-melts" element={<WaxMeltsPage isLoggedIn={isLoggedIn} setUserCartItems={setUserCartItems} />} />
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
