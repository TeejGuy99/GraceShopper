const express = require('express');
const router = express.Router();
const { Guest } = require('../db');

// GET /api/product
router.get('/', async(req, res, next) => {
    try {
        const guests = await Guest.getAllGuests();

        res.send(guests)
    } catch (error) {
        console.error(error)
    }
})

// GET /api/guest/:guestId
router.get('/:guestId', async(req, res, next) => {
    try {
        const { guestId } = req.params;
        
        let guest = await Guest.getGuestById({ id: guestId })

        res.send(guest)

    } catch (error) {
        console.error(error)
    }
})

module.exports = router;