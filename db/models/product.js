// grab our db client connection to use with our adapters
const client = require('../client');
const { getPhotosByProductId } = require('./photo')
const { getReviewsByProductId } = require('./review')

module.exports = {
    // add your database adapter fns here
    getAllProducts,
    createProduct,
    getProductById,
    deleteProduct
  };

  async function getAllProducts() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM products;
    `)

    // for (i=0; i < rows.length; i++) {
    //   rows[i].photos = 
    // }

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
    const photos = await getPhotosByProductId({ productId: id })

    const reviews = await getReviewsByProductId({ productId: id })

    const { rows: [ product ] } = await client.query(`
      SELECT * FROM products
      WHERE id=$1;
    `, [ id ])

    product.photos = photos
    product.reviews = reviews

    return product
  }

  async function deleteProduct({ id }) {
    //carts, photos, reviews
    await client.query(`
      DELETE FROM reviews
      WHERE "productId"=$1
      RETURNING *;
    `, [ id ])
    
    await client.query(`
    DELETE FROM photos
    WHERE "productId"=$1
    RETURNING *;
  `, [ id ])
    
    await client.query(`
      DELETE FROM carts
      WHERE "productId"=$1
      RETURNING *;
    `, [ id ])

    const { rows: [deletedProduct] } = await client.query(`
      DELETE FROM products
      WHERE id=$1
      RETURNING *;
    `, [ id ])

    return deletedProduct
  }