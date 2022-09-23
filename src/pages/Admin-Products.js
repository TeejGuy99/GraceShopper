import React from "react";
import { getAllProducts } from "../api";
import { useEffect } from "react";
import "../style/Products.scss";

export default function AdminProducts() {
  const { products, setProducts} = props;
  const handleRoutines = () => {
    getAllProducts().then((results) => {
      setProducts(results);
    });
  };
  useEffect(() => {
    handleRoutines();
  }, []);
  return (
    <div className="Products">
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
          </div>
        );
      })}
    </div>
  );
}
