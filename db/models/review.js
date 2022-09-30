// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllReviews,
    createReview,
    getReviewsByProductId,
    deleteReview
  };

  async function getAllReviews() {
    const { rows } = await client.query(`
      SELECT * FROM reviews;
    `)
    return rows
  }

  async function createReview({ creatorId, productId, name, description }) {
    const { rows: [ review ] } = await client.query(`
      INSERT INTO reviews("creatorId", "productId", name, description)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (description) DO NOTHING
      RETURNING *;
    `, [ creatorId, productId, name, description ]);
  
    return review
  }

  async function getReviewsByProductId( { productId } ) {
    const { rows: reviews } = await client.query(`
      SELECT * FROM reviews
      WHERE "productId"=$1;
    `, [ productId ])

    return reviews
  }

  async function deleteReview({ reviewId }) {
    const { rows: [review] } = await client.query(`
      DELETE FROM reviews
      WHERE id=$1
      RETURNING *;
    `, [ reviewId ])
    return review
  }