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


// POST /api/cart *ADD TO USER CART FOR GUESTS OR REGISTERED USERS*
router.post('/', async(req, res, next) => {
    try {
        const { productId, productQty } = req.body

        if (req.user) {
            const { cartUserId } = req.user.userId
            const createdCart = await Cart.addToCart({ productId, productQty, cartUserId })
            res.send(createdCart)
        } else {
            const { cartGuestId } = await Guest.createGuest({ isActive: true })
            localStorage.setItem('guestId', cartGuestId)
            const createdCart = await Cart.addToCart({ productId, productQty, cartGuestId })
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
        const cartCheck = Cart.getCartItemById({ id: cartId });

        const { userId } = req.user.userId
        const { guestId } = localStorage.getItem('guestId')

        if (cartCheck.cartUserId != userId || cartCheck.cartGuestId != guestId) {
            throw new Error(`You are not allowed to edit this cart`)            
        }

        const { productQty } = req.body;
        if (productQty <= 0) {
            throw new Error(`Item quantity must be greater than zero`)
        }

        const updatedCartItem = await Cart.updateCartItem({ id: cartId, productQty})

        res.send(updatedCartItem)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// DELETE /api/cart/:cartId *REMOVE FROM USER CART FOR GUESTS OR REGISTERED USERS 
// (NEED A WAY TO PROTECT GUEST CARTS - Maybe assign a localStorage item with the guest id?)*
router.delete('/:cartId', async(res, req, next) => {
    try {
        const { cartId } = req.params
        const cartCheck = Cart.getCartItemById({ id: cartId });

        const { userId } = req.user.userId
        const { guestId } = localStorage.getItem('guestId')

        if (cartCheck.cartUserId != userId || cartCheck.cartGuestId != guestId) {
            throw new Error(`You are not allowed to edit this cart`)            
        }
        
        const deletedCartItem = await Cart.deleteCartItem({ id: cartId })

        res.send(deletedCartItem)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;