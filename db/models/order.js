// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllOrders,
    createOrder,
    createOrderFromCart
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

  async function createOrderFromCart({ isUserId=null, isGuestId=null }) {
    const { rows: cart } = await client.query(`
    SELECT * FROM carts
    WHERE ("cartUserId"=$1 OR "cartGuestId"=$2)
    AND ("isActive"=true);
  `, [ isUserId, isGuestId ])

    const { rows: [ order ] } = await client.query(`
      INSERT INTO orders("isUserId", "isGuestId")
      VALUES ($1, $2)
      RETURNING *;
    `, [ isUserId, isGuestId ])

    order.cart = cart

    const { rows: [ assignOrderId ] } = await client.query(`
      UPDATE carts
      SET "orderId"=$1
      WHERE ("cartUserId"=$2 OR "cartGuestId"=$3)
      AND ("isActive"=true);
    `, [ order.id, isUserId, isGuestId ])

    const { rows: [ closeCart ] } = await client.query(`
      UPDATE carts 
      SET "isActive"=false
      WHERE ("cartUserId"=$1 OR "cartGuestId"=$2);
    `, [ isUserId, isGuestId ])
  
    return order
  }