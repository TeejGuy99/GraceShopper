// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllProducts,
    createProduct
  };

  async function getAllProducts() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM products;
    `)
    return rows
  }

  async function createProduct({ name, description, price, qtyAvailable }) {
    const { rows: [ product ] } = await client.query(`
      INSERT INTO products(name, description, price, "qtyAvailable")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [ name, description, price, qtyAvailable ]);
  
    return product
  }