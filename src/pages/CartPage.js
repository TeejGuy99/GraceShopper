import React, { useState, useEffect } from "react";
import {
  addToCart,
  getAllProducts,
  getUserCart,
  deleteCartItem,
  updateCart,
  createOrder,
} from "../api";
import { BsPersonFill, BsFillCartFill } from "react-icons/bs";
import {
  FaTrash,
  FaPlusSquare,
  FaMinusSquare,
  FaSadTear,
  FaRegCheckCircle,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Products.scss";
import "../style/CheckOut.scss";

const CartPage = (props) => {
  const {
    isLoggedIn,
    getUserCartItems,
    setUserCartItems,
    getUserToken,
    userId,
    guestId,
    setGuestId,
  } = props;
  let navigate = useNavigate();
  const [checkedOut, setCheckedOut] = useState(false);
  const [orderId, setOrderId] = useState(null);
  let createdOrder = {};

  function continueShoppingHandler() {
    navigate("/");
  }

  const handleRoutines = () => {
    getUserCart({ token: getUserToken, userID: userId, guestID: guestId }).then(
      (results) => {
        setUserCartItems(results);
      }
    );
  };
  useEffect(() => {
    handleRoutines();
  }, []);
  console.log("getUserCartItems:", getUserCartItems);
  let total = 0;
  for (let i = 0; i < getUserCartItems.length; i++) {
    total += getUserCartItems[i].productPrice * getUserCartItems[i].productQty;
  }
  total = total.toFixed(2);
  return (
    <div className="Products">
      {!checkedOut ? (
        <div className="Products">
          {getUserCartItems
            .sort(function (a, b) {
              var keyA = a.cartId,
                keyB = b.cartId;
              // Compare the 2 dates
              if (keyA < keyB) return -1;
              if (keyA > keyB) return 1;
              return 0;
            })
            .map((product) => {
              return (
                <div className="product-items" key={product.cartId}>
                  <img
                    className="item-img"
                    src={product.photos[0].link}
                    alt={product.photos[0].description}
                  />
                  <div className="item-description">
                    <p className="item-name">{product.productName}</p>
                    <p className="item-price">Price ${product.productPrice}</p>
                  </div>
                  <p className="quantity-box">QUANTITY</p>
                  <div className="item-quantity">
                    {/*This is where the update productQty needs to go*/}
                    <button
                      className="minus"
                      onClick={async (event) => {
                        event.preventDefault();
                        await updateCart(
                          product.cartId,
                          product.productQty - 1
                        );
                        handleRoutines();
                      }}
                    >
                      <FaMinusSquare />
                    </button>

                    <input
                      className="productQtyInput"
                      value={product.productQty}
                      readOnly
                    ></input>

                    <button
                      className="plus"
                      onClick={async (event) => {
                        event.preventDefault();
                        await updateCart(
                          product.cartId,
                          product.productQty + 1
                        );
                        handleRoutines();
                      }}
                    >
                      <FaPlusSquare />
                    </button>
                  </div>
                  <div className="item-subtotal">
                    {/* <p className="subtotal">
                      Item Sub-Total $
                      {(product.productPrice * product.productQty).toFixed(2)}
                    </p> */}
                  </div>

                  <button
                    className="removeCart-btn"
                    onClick={async (event) => {
                      event.preventDefault();
                      await deleteCartItem(product.cartId);
                      handleRoutines();
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          {total > 0 ? (
            <div className="checkout-btn">
              <h1>SUBTOTAL: {total}</h1>
              <button
                // style={{color: "white", backgroundColor: "black", height: "30px", hover:"color: black, backgroundColor: white"}}
                className="checkout-now"
                onClick={async (event) => {
                  event.preventDefault();
                  if (isLoggedIn) {
                    createdOrder = await createOrder(userId, setGuestId(null));
                    handleRoutines();
                    setCheckedOut(true);
                    setOrderId(createdOrder.id);
                  } else {
                    createdOrder = await createOrder(userId, guestId);
                    handleRoutines();
                    setCheckedOut(true);
                    console.log(createdOrder);
                    setOrderId(createdOrder.id);
                  }
                  // navigate('/')
                }}
              >
                <BsFillCartFill size={30} />
                CHECKOUT
              </button>
            </div>
          ) : (
            <div className="empty-cart">
              <p>
                YOUR CART IS EMPTY <FaSadTear />
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="confirmation">
          <p className="thank-title">THANK YOU</p>
          <i>
            <FaRegCheckCircle />
          </i>
          <div className="thanks">
            <p>Thank you for shopping with Kashyyk Candles</p>
            <p className="order-num">
              Your order has been placed and your order # is {orderId}
            </p>
            <div className="continue">
              <button onClick={continueShoppingHandler}>
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
