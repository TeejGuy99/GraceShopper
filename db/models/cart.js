// grab our db client connection to use with our adapters
const client = require('../client');

const { getProductById } = require('./product');

module.exports = {
    // add your database adapter fns here
    getAllCarts,
    addToCart
  };

  async function getAllCarts() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM carts;
    `)
    return rows
  }

  async function addToCart({ productId, productQty, cartUserId=null, cartGuestId=null }) {
    const product = await getProductById({ id: productId })
    console.log("addToCart product:", product);

    const { rows: [ cart ] } = await client.query(`
      INSERT INTO carts("productPrice", "productId", "productQtyAvailable", "productQty", "cartUserId", "cartGuestId")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [ product.price, productId, product.qtyAvailable, productQty, cartUserId, cartGuestId ]);

  
    return cart
  }

  async function getCartByUserId({ userId }) {
    
  }