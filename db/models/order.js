// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllOrders,
    createOrder
  };

  async function getAllOrders() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM orders;
    `)
    return rows
  }

  async function createOrder({ isUserId=null, isGuestId=null }) {
    const { rows: [ product ] } = await client.query(`
      INSERT INTO orders("isUserId", "isGuestId")
      VALUES ($1, $2)
      RETURNING *;
    `, [ isUserId, isGuestId ]);
  
    return product
  }