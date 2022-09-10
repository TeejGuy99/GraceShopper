// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllReviews,
    createReview
  };

  async function getAllReviews() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM reviews;
    `)
    return rows
  }

  async function createReview({ creatorId, name, description }) {
    const { rows: [ review ] } = await client.query(`
      INSERT INTO reviews("creatorId", name, description)
      VALUES ($1, $2, $3)
      ON CONFLICT (description) DO NOTHING
      RETURNING *;
    `, [ creatorId, name, description ]);
  
    return review
  }