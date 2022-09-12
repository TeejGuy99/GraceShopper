const express = require('express');
const router = express.Router();
const { Order } = require('../db');

// GET /api/order
router.get('/', async(req, res, next) => {
    try {
        const users = await Order.getAllOrders();

        res.send(users)
    } catch (error) {
        console.error(error)
    }
})

// GET /api/order/:orderId
router.get('/:orderid', async(req, res, next) => {
    try {
        const { orderid } = req.params;

        let order = await Order.getOrderById({ id:orderid })

        res.send(order)

    } catch (error) {
        console.error(error)
    }
})

module.exports = router;