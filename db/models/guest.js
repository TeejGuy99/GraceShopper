// grab our db client connection to use with our adapters
const client = require('../client');
const { Product } = require('./')

module.exports = {
    // add your database adapter fns here
    getAllGuests,
    createGuest,
    getGuestById
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
      RETURNING id AS "guestId";
    `, [ isActive ]);
  
    return guest
  }

  async function getGuestById({ id }) {
    const { rows: cart } = await client.query(`
      SELECT carts.id AS cartId, carts."productId", carts."productPrice", carts."productQty", products.name AS "productName"
      FROM carts
      JOIN products ON carts."productId"=products.id
      WHERE "cartGuestId"=$1
      AND "isActive"=true;
    `, [ id ])
  
    const { rows: orders } = await client.query(`
      SELECT orders.id, carts."productId", carts."productPrice", carts."productQty"
      FROM orders
      JOIN carts ON orders.id=carts."orderId"
      WHERE "isGuestId"=$1;
    `, [ id ])
  
    const { rows: [ guest ] } = await client.query(`
      SELECT id AS "guestId" FROM guests
      WHERE id = $1;
    `, [ id ])
  
    guest.cart = cart
    guest.orders = orders
  
    return guest
  }