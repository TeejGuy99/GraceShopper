const express = require('express');
const router = express.Router();
const { Cart, Guest } = require('../db');

// GET /api/cart
router.get('/', async(req, res, next) => {
    try {
        const carts = await Cart.getAllCarts();

        res.send(carts)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// GET /api/cart/userId or guestId
router.get('/userId/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params

        const carts = await Cart.getCartByUserId({ cartUserId: userId, cartGuestId: null })

        res.send(carts)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// GET /api/cart/userId or guestId
router.get('/guestId/:guestId', async(req, res, next) => {
    try {
        const { guestId } = req.params

        const carts = await Cart.getCartByUserId({ cartUserId: null, cartGuestId: guestId })

        res.send(carts)
    } catch (error) {
        console.error(error)
        next(error)
    }
})


// POST /api/cart *ADD TO USER CART FOR GUESTS OR REGISTERED USERS*
router.post('/', async(req, res, next) => {
    try {
        const { productId, productQty, cartUserId, cartGuestId } = req.body

        if (cartUserId) {
            const createdCart = await Cart.addToCart({ productId, productQty, cartUserId, cartGuestId: null })
            res.send(createdCart)
        } else if (cartGuestId === 0) {
            const newGuest = await Guest.createGuest({ isActive: true })
            const createdCart = await Cart.addToCart({ productId, productQty, cartUserId: null, cartGuestId: newGuest.guestId })
            res.send(createdCart)
        } else {
            const createdCart = await Cart.addToCart({ productId, productQty, cartUserId: null, cartGuestId })
            res.send(createdCart)
            }
        } catch (error) {
        console.error(error)
        next(error)
    }
})

// PATCH /api/cart/:cartId *UPDATE CART ENTRY FOR QTY (CANNOT BE ZERO)
router.patch('/:cartId', async(req, res, next) => {
    try {
        const { cartId } = req.params;

        const { productQty } = req.body

        if (productQty <= 0) {
            throw new Error(`Item quantity must be greater than zero`)
        }

        const updatedCartItem = await Cart.updateCartItem({ id: cartId, productQty: productQty})

        res.send(updatedCartItem)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// DELETE /api/cart/:cartId *REMOVE FROM USER CART FOR GUESTS OR REGISTERED USERS 
router.delete('/:cartId', async(req, res, next) => {
    try {
        const { cartId } = req.params
        
        const deletedCartItem = await Cart.deleteCartItem({ id: cartId })

        res.send(deletedCartItem)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;