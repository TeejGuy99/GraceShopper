const express = require('express');
const router = express.Router();
const { Review } = require('../db');

// GET /api/review
router.get('/', async(req, res, next) => {
    try {
        const reviews = await Review.getAllReviews();

        res.send(reviews)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// POST /api/review
router.post('/', async(req, res, next) => {
    try {      
        let authorId = req.user.userId;
        const { productId, name, description } = req.body;
        
        const newReview = await Review.createReview({ creatorId: authorId, productId, name, description });

        res.send(newReview);
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// DELETE /api/review/:reviewId
router.delete('/:reviewId', async(req, res, next) => {
    try {
        const { reviewId } = req.params;

        const deletedReview = await Review.deleteReview({ reviewId })

        res.send(deletedReview);
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;