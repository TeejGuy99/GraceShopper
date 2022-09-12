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
    }
})

module.exports = router;