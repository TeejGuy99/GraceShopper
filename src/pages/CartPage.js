import React, { useState, useEffect } from "react";
import { addToCart, getAllProducts, getUserCart, deleteCartItem, updateCart } from "../api";
import { BsPersonFill, BsFillCartFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Products.scss";


const ProductStyling = {
  border: "2px solid black",
  padding: "1em",
  margin: "1em",
};

const CartPage = (props) => {
  const { isLoggedIn, getUserCartItems, setUserCartItems, getUserToken, userId, guestId, setGuestId } = props;
  let navigate = useNavigate();


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
            <p className="quantity-box">QUANTITY</p>
            {/*This is where the update productQty needs to go*/}
            <button onClick={async (event) => {
              event.preventDefault();
              await updateCart(product.cartId, product.productQty-1)
              handleRoutines();
            }}>-</button>

            <input
            className="productQtyInput"
            value={product.productQty}></input>

            <button onClick={async (event) => {
              event.preventDefault();
              await updateCart(product.cartId, product.productQty+1)
              handleRoutines();
            }}>+</button>
          </div>
          <div className="item-subtotal">
            <p className="subtotal">Item Sub-Total ${(product.productPrice*product.productQty).toFixed(2)}</p>
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
      {total>0 ? <div className="product-items">
        <h1>SUBTOTAL {total}</h1>
        <button 
          // style={{color: "white", backgroundColor: "black", height: "30px", hover:"color: black, backgroundColor: white"}}
          className="addCart-btn"
          onClick={async (event) => {
            event.preventDefault();
            navigate('/')
          }}
        >
          <NavLink
            to="/cart"
          >
            <BsFillCartFill size={25} color="white" />
          </NavLink>
          <p style={{display: "inline", margin: "15px", fontSize: "25px"}}>CHECKOUT</p>
        </button>
      </div> : null}
    </div>
  );
};

export default CartPage;
