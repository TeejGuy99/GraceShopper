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

        const order = await Order.getOrderById({ id:orderid })

        res.send(order)

    } catch (error) {
        console.error(error)
    }
})

// POST /api/order/
router.post('/', async(req, res, next) => {
    try {
        const { isUserId, isGuestId } = req.body

        const newOrder = await Order.createOrderFromCart({ isUserId, isGuestId })

        res.send(newOrder)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// DELETE /api/order/:orderId
router.delete('/:orderId', async(res, req, next) => {
    try {
        const { orderId } = req.params

        const deletedOrder = Order.deleteOrder({ orderId })

        res.send(deletedOrder)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;