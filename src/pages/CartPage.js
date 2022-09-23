import React, { useState } from "react";
import { addToCart, getAllProducts, getUserCart, deleteCartItem } from "../api";
import { useEffect } from "react";
import "../style/Products.scss";

const ProductStyling = {
  border: "2px solid black",
  padding: "1em",
  margin: "1em",
};

const CartPage = (props) => {
  const { isLoggedIn, getUserCartItems, setUserCartItems, getUserToken, userId, guestId, setGuestId } = props;
  const handleRoutines = () => {
    getUserCart({token: getUserToken, userID: userId, guestID: guestId }).then((results) => {
        setUserCartItems(results);
    });
  };
  useEffect(() => {
    handleRoutines();
  }, []);
  let total = 0;
  for (let i=0; i<getUserCartItems.length; i++) {
    total += (getUserCartItems[i].productPrice*getUserCartItems[i].productQty)
  }
  total = total.toFixed(2);
  return (
    <div className="Products">
      {getUserCartItems.map((product) => {
        return (
          <div className="product-items">
          <img
            className="item-img"
            src={product.photos[0].link}
            alt={product.photos[0].description}
          />
          <div className="item-description">
            <p className="item-name">{product.productName}</p>
            <p className="item-price">Price ${product.productPrice}</p>
          </div>
          <div className="item-quantity">
            <p className="quantity-box">QUANTITY {product.productQty}</p>
          </div>
          <div className="item-subtotal">
            <p className="subtotal">Item Sub-Total ${product.productPrice*product.productQty}</p>
          </div>
            
            <button
              className="removeCart-btn"
              onClick={async (event) => {
                event.preventDefault();
                await deleteCartItem(product.cartId)
                handleRoutines();
              }}
            >
              X
            </button>
          </div>
        );
      })}
      <h1>SUBTOTAL {total}</h1>
    </div>
  );
};

export default CartPage;
