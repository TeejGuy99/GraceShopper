const express = require('express');
const router = express.Router();
const { Product, User } = require('../db');

// GET /api/product
router.get('/', async(req, res, next) => {
    try {
        let category = req.query.category;
        if (category) {
            let products = await Product.getProductsByCategory({ category: category })

            res.send(products)
        } else {
            const products = await Product.getAllProducts();

            res.send(products)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// GET /api/product/:productId
router.get('/:productId', async(req, res, next) => {
    try {
        const { productId } = req.params;

        let product = await Product.getProductById({ id: productId })

        res.send(product)

    } catch (error) {
        console.error(error)
        next(error)
    }
})

// ADMIN ROUTES*************************************************

// POST /api/product
router.post('/', async(req, res, next) => {
    try {
        if (!req.user) {
            throw new Error(`You must be logged in to perform this action`)
        }

        if (!req.user.isAdmin) {
            throw new Error(`You must be an admin to perform this action`)
        }

        const { name, description, price, qtyAvailable, category } = req.body
        const newProduct = await Product.createProduct({ name: name, description: description, price: price, qtyAvailable: qtyAvailable, category: category});

        res.send(newProduct)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// PATCH *UPDATE PRICE OF PRODUCT*
router.patch('/:productId', async(req, res, next) => {
    try {
            const { name, description, price, qtyAvailable, category } = req.body;
            const { productId } = req.params;
            
            const updatedProduct = await Product.updateProduct({ id: productId, name: name, description: description, price: price, qtyAvailable: qtyAvailable, category: category})

            res.send(updatedProduct)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// DELETE /api/product/:productId
router.delete('/:productId', async(req, res, next) => {
    try {
        const { productId } = req.params
        const deletedProduct = await Product.deleteProduct({ id: productId })

        res.send(deletedProduct)
    } catch (error) {
        console.error(error)
        next(error)
    }
})


module.exports = router;