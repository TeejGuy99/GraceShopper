const express = require('express');
const router = express.Router();
const { Cart } = require('../db');

// GET /api/cart
router.get('/', async(req, res, next) => {
    try {
        const carts = await Cart.getAllCarts();

        res.send(carts)
    } catch (error) {
        console.error(error)
    }
})


// POST *ADD TO USER CART FOR GUESTS OR REGISTERED USERS*

// DELETE *REMOVE FROM USER CART FOR GUESTS OR REGISTERED USERS*

module.exports = router;