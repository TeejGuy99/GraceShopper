const express = require('express');
const router = express.Router();
const { Photo } = require('../db');

// GET /api/photo
router.get('/', async(req, res, next) => {
    try {
        const photos = await Photo.getAllPhotos();

        res.send(photos)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;