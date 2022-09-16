import React from "react";

const ProductStyling = {
    border: "2px solid black",
    padding: "1em",
    margin: "1em"
}

const AllProductsPage = () => {
    return(
        <div style={ProductStyling}>
            <h1>Product 1</h1>
            <p>A Candle</p>
            <p>Name: </p>
            <p>Price: </p>
            <p>Quantity: </p>
            <p>Description: </p>
        </div>
    );
}

export default AllProductsPage;