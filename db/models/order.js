// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllOrders,
    getOrderById,
    createOrder,
    createOrderFromCart,
    deleteOrder
  };

  async function getAllOrders() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM orders;
    `)
    return rows
  }

  async function getOrderById({ id }) {
    const { rows: [ order ] } = await client.query(`
      SELECT id FROM orders
      WHERE id=$1;
    `, [ id ])

    const { rows: products } = await client.query(`
      SELECT * FROM carts
      WHERE "orderId"=$1;
    `, [ id ])

    order.products = products

    return order
  }

  async function createOrder({ isUserId=null, isGuestId=null }) {
    const { rows: [ order ] } = await client.query(`
      INSERT INTO orders("isUserId", "isGuestId")
      VALUES ($1, $2)
      RETURNING *;
    `, [ isUserId, isGuestId ]);
  
    return order
  }

  // FIX THIS TO UPDATE THE REMAINING QTY AVAILABLE
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

    await client.query(`
      UPDATE carts
      SET "orderId"=$1
      WHERE ("cartUserId"=$2 OR "cartGuestId"=$3)
      AND ("isActive"=true);
    `, [ order.id, isUserId, isGuestId ])

    await client.query(`
      UPDATE carts 
      SET "isActive"=false
      WHERE ("cartUserId"=$1 OR "cartGuestId"=$2);
    `, [ isUserId, isGuestId ])

    // This should adjust the total inventory when an order is placed 
    // (Remove the order qty from total inventory by looping through each item in the cart)
    for (i=0; i<cart.length; i++) {
      let productToEdit = cart[i].productId

      const { rows: [checkQtyAvailable] } = await client.query(`
        SELECT "qtyAvailable"
        FROM products
        WHERE id=$1;
      `, [ productToEdit ])

      let qtyRemaining = (checkQtyAvailable.qtyAvailable - cart[i].productQty)

      await client.query(`
        UPDATE products
        SET "qtyAvailable"=$1
        WHERE "id"=$2;
      `, [ qtyRemaining, productToEdit ])
    }
  
    return order
  }

  async function deleteOrder({ id }) {
    const { rows: products } = await client.query(`
      SELECT * FROM carts
      WHERE "orderId"=$1;
    `, [ id ])

    for (let i=0; i<products.length; i++) {
      let productId = products[i].productId
      let qtyToReturn = products[i].productQty

      const { rows: [checkQtyAvailable] } = await client.query(`
        SELECT "qtyAvailable"
        FROM products
        WHERE id=$1;
      `, [ productId ])

      let newTotalQty = (checkQtyAvailable.qtyAvailable + qtyToReturn)

      await client.query(`
        UPDATE products
        SET "qtyAvailable"=$1
        WHERE id=$2;
      `, [ newTotalQty, productId ])
    }

    const { rows: [order] } = await client.query(`
      DELETE FROM orders
      WHERE id=$1
      RETURNING *;
    `, [ id ])
    return order
  }