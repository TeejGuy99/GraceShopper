// grab our db client connection to use with our adapters
const client = require("../client");

const { getProductById } = require("./product");

module.exports = {
    // add your database adapter fns here
    getAllCarts,
    addToCart,
    getCartItemById,
    deleteCartItem,
    updateCartItem
  };


async function getAllCarts() {
  /* this adapter should fetch a list of users from your db */
  const { rows } = await client.query(`
      SELECT * FROM carts;
    `);
  return rows;
}

  async function addToCart({ productId, productQty, cartUserId=null, cartGuestId=null }) {
    const product = await getProductById({ id: productId })


  const { rows: [cart] } = await client.query(`
      INSERT INTO carts("productPrice", "productId", "productQtyAvailable", "productQty", "cartUserId", "cartGuestId")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [ product.price, productId, product.qtyAvailable, productQty, cartUserId, cartGuestId ]);

  return cart;
}

async function getCartByUserId({ cartUserId = null, cartGuestId = null }) {
  const { rows } = await client.query(
    `
      SELECT * FROM carts
      WHERE "cartUserId"=$1
      OR "cartGuestId"=$2
    `, [ cartUserId, cartGuestId ])
    return rows
  }

  async function getCartItemById({ id }) {
    const { rows: [ cart ] } = await client.query(`
      SELECT * FROM carts
      WHERE id=$1;
    `, [ id ])
    return cart
  }

  async function deleteCartItem({ id }) {
    const { rows: [cartItem] } = await client.query(`
      DELETE FROM carts
      WHERE id=$1
      RETURNING *;
    `, [ id ])
    return cartItem
  }

  async function updateCartItem({ id, ...fields}) {
    const setString = Object.keys(fields).map(
      (key, index) => `"${key}"=$${ index + 1 }`
    ).join(', ');
  
    if (setString.length === 0) {
      return;
    }
  
    const { rows: [ cartItem ] } = await client.query(`
      UPDATE carts
      SET ${ setString }
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields))
  
    return cartItem
  }

