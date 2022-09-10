const express = require('express');
const router = express.Router();
const { Product } = require('../db');

// GET /api/product
router.get('/', async(req, res, next) => {
    try {
        const users = await Product.getAllProducts();
        console.log(req.body);
        res.send(users)
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