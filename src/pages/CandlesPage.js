import React, { useState } from "react";
import { addToCart, getCandles, getUserCart } from "../api";
import { useEffect } from "react";
import "../style/Products.scss";

const CandlesPage = (props) => {
    const { products, setProducts, guestId, setGuestId, userId, getUserToken, setUserCartItems, getUserCartItems } = props;
    const handleRoutines = () =>{
        getCandles()
        .then(results => {
            setProducts(results)                
        });
    }
    const refreshCart = () => {
        getUserCart({token: getUserToken, userID: userId, guestID: guestId }).then((results) => {
            setUserCartItems(results);
        });
        };
    useEffect(() =>{
        handleRoutines();
    }, [getUserCartItems.length]);
  return (
    <div className="Products-Wax-Candles">
      {products.map((product) => {
        return (
          <div className="product-items">
            <img
              className="item-img"
              src={product.photos[0].link}
              alt={product.photos[0].description}
            />
            <div className="item-description">
              <p className="item-name">{product.name}</p>
              <p className="item-price">${product.price}</p>
            </div>
            <div className="item-slogan">
              <p className="slogan">{product.description}</p>
            </div>

            {/* <p>Quantity Available: {product.qtyAvailable}</p> */}
            <button
              className="addCart-btn"
              onClick={async (event) => {
                event.preventDefault();
                if (userId) {
                  const newCartItem = await addToCart(product.id, 1, userId, guestId);
                } else if (guestId === 0) {
                  const newCartItem = await addToCart(product.id, 1, userId, guestId);
                  setGuestId(newCartItem.cartGuestId);
                } else {
                  const newCartItem = await addToCart(product.id, 1, userId, guestId);
                }
                refreshCart();
              }}
            >
              ADD TO CART
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CandlesPage;
