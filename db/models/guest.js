// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllGuests,
    createGuest
  };

  async function getAllGuests() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM guests;
    `)
    return rows
  }

  async function createGuest({ isActive }) {
    const { rows: [ guest ] } = await client.query(`
      INSERT INTO guests("isActive")
      VALUES ($1)
      RETURNING *;
    `, [ isActive ]);
  
    return guest
  }