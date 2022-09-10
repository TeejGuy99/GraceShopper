// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllProducts,
    createProduct,
    getProductById
  };

  async function getAllProducts() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM products;
    `)
    return rows
  }

  async function createProduct({ name, description, price, qtyAvailable, category }) {
    const { rows: [ product ] } = await client.query(`
      INSERT INTO products(name, description, price, "qtyAvailable", category)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [ name, description, price, qtyAvailable, category ]);
  
    return product
  }

  async function getProductById({ id }) {
    const { rows: [ product ] } = await client.query(`
      SELECT * FROM products
      WHERE id=$1;
    `, [ id ])

    return product
  }