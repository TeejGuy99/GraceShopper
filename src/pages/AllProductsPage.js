import React, { useState } from "react";
import { addToCart, getAllProducts } from "../api";
import { useEffect } from "react";


const ProductStyling = {
    border: "2px solid black",
    padding: "1em",
    margin: "1em"
}

const AllProductsPage = (props) => {
        const {products, setProducts, guestId, setGuestId} = props;
        const handleRoutines = () =>{
            getAllProducts()
            .then(results => {
                setProducts(results)                
            });
        }
        useEffect(() =>{
            handleRoutines();
        }, []);
        console.log(guestId);
    return(
        <div className="Products">
            {products.map((product) => { return (
                <div style={ProductStyling}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>Name: {product.name}</p>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.qtyAvailable}</p>
                    <p>Description: {product.desription}</p>
                    <button style={{margin: '5px'}} id='addToCartButton' onClick={async (event) => {
                        event.preventDefault()
                        if (guestId === 0) {
                            const newCartItem = await addToCart(product.id, 1, guestId)
                            console.log(newCartItem);
                            setGuestId(newCartItem.cartGuestId)
                            console.log(guestId);
                        } else {
                            const newCartItem = await addToCart(product.id, 1, guestId)
                        }
                        handleRoutines()
                        }}>
                        Add To Cart
                    </button>
                </div>)
            })}
        </div>
    );
}

export default AllProductsPage;