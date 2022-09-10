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

  async function createPhoto({ description, link }) {
    const { rows: [ photo ] } = await client.query(`
      INSERT INTO photos(description, link)
      VALUES ($1, $2)
      RETURNING *;
    `, [ description, link ]);
  
    return photo
  }