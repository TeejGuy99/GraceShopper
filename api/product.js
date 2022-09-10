const express = require('express');
const router = express.Router();
const { Product } = require('../db');

// GET /api/product
router.get('/', async(req, res, next) => {
    try {
        const products = await Product.getAllProducts();

        res.send(products)
    } catch (error) {
        console.error(error)
    }
})

// GET /api/product/:productid
router.get('/:productid', async(req, res, next) => {
    try {
        const { productid } = req.params;

        let product = await Product.getProductById({ id:productid })

        res.send(product)

    } catch (error) {
        console.error(error)
    }
})

module.exports = router;

// POST *ADD TO USER CART FOR GUESTS OR REGISTERED USERS*

// DELETE *REMOVE FROM USER CART FOR GUESTS OR REGISTERED USERS*




// ADMIN ROUTES*************************************************
// PATCH *UPDATE PRICE OF PRODUCT*
// DELETE *DELETE PRODUCT*
// POST *ADD PRODUCT*
// 