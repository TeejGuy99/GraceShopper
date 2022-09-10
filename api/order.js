const express = require('express');
const router = express.Router();
const { Order } = require('../db');

// GET /api/order
router.get('/', async(req, res, next) => {
    try {
        const users = await Order.getAllOrders();
        console.log(req.body);
        res.send(users)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;