import React, { useState } from "react";
import { addToCart, getWaxMelts } from "../api";
import { useEffect } from "react";


const ProductStyling = {
    border: "2px solid black",
    padding: "1em",
    margin: "1em"
}

const WaxMeltsPage = (props) => {
        const {products, setProducts, guestId, setGuestId} = props;
        const handleRoutines = () =>{
            getWaxMelts()
            .then(results => {
                setProducts(results)                
            });
        }
        useEffect(() =>{
            handleRoutines();
        }, []);
    return(
        <div className="Products">
            {products.map((product) => { return (
                <div style={ProductStyling}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <img src={product.photos[0].link} alt={product.photos[0].description}/>
                <p>Price: {product.price}</p>
                <p>Quantity Available: {product.qtyAvailable}</p>
                <button style={{margin: '5px'}} id='addToCartButton' onClick={async (event) => {
                    event.preventDefault()
                    if (guestId === 0) {
                        const newCartItem = await addToCart(product.id, 1, guestId)
                        setGuestId(newCartItem.cartGuestId)
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

export default WaxMeltsPage;