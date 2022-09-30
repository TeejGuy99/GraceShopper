import React, { useState } from "react";
import { addToCart, getAllProducts, getUserCart } from "../api";
import { useEffect } from "react";
import "../style/Products.scss";

const ProductStyling = {
  border: "2px solid black",
  padding: "1em",
  margin: "1em",
};

const AllProductsPage = (props) => {
  const { products, setProducts, guestId, setGuestId, userId, getUserToken, setUserCartItems, getUserCartItems } = props;
  const handleRoutines = () => {
    getAllProducts().then((theProducts) => {
      setProducts(theProducts);
    });
  };
  const refreshCart = () => {
    getUserCart({token: getUserToken, userID: userId, guestID: guestId }).then((results) => {
      setUserCartItems(results);
  });
  };
  useEffect(() => {
    handleRoutines();
  }, [getUserCartItems.length]);

  return (
    <div className="Products">
      {products.sort(function(a, b) {
        var keyA = (a.id),
          keyB = (b.id);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      }).map((product) => {
        return (
          <div className="product-items" key={product.id}>
            {product.qtyAvailable <=0 ? null :
            <div >
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
            </div>}
          </div>
        );
      })}
    </div>
  );
};

export default AllProductsPage;
