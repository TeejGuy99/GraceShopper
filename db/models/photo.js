// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllPhotos,
    createPhoto
  };

  async function getAllPhotos() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM photos;
    `)
    return rows
  }

  async function createPhoto({ description, link, productId }) {
    const { rows: [ photo ] } = await client.query(`
      INSERT INTO photos(description, link, "productId")
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ description, link, productId ]);
  
    return photo
  }