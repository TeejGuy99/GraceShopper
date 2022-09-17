import React from "react";
import { useEffect } from "react";
import { getSingleProduct } from "../api";

const CartPage = (props) => {
    
    const {getUserCartItems, isLoggedIn, logInUser, getUserInfo} = props; 

    const cartStyle = {
        border: "2px solid black",
        margin: "1em",
        padding: "1em"
    }

    useEffect(() => {
        // console.log("attempting to sign in as tim@seed.com: ");
		// console.log(logInUser("tim@seed.com", "tim01"));
        // console.log("user info: ");
        // console.log(getUserInfo(3));
		// const items = getUserCartItems;
        // console.log(items);
	}, []);
    return(
        <div id="cart" style={cartStyle}>
            <h1>Your Cart</h1>
            {getUserCartItems?.length && getUserCartItems.map((items) => (
                <div>
                    <p>Price: {items.productPrice}</p>
                    <p>Quantity: {items.productQty}</p>
                    <p>Item ID: {items.productId}</p>
                </div>
                
            ))}
            
            {/* <div id="single-item">
                <img src="" alt="Image Here"/>
                <p>Item Name</p>
                <p>Item Price</p>
                <p>Item Quantity</p>
                <button>Remove Item</button>
            </div> */}
            <div id="subTotal">
                <p>Subtotal</p>
            </div>
            <div id="checkoutButton">
                <button>Checkout</button>
            </div>
        </div>
    );
}

export default CartPage;