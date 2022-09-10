// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllOrderProducts,

  };

  async function getAllOrderProducts() {
    const { rows } = await client.query(`
      SELECT * FROM order_products;
    `)
    return rows
  }

