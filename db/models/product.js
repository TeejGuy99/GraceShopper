// grab our db client connection to use with our adapters
const client = require('../client');
const { getPhotosByProductId } = require('./photo')
const { getReviewsByProductId } = require('./review')

module.exports = {
    // add your database adapter fns here
    getAllProducts,
    createProduct,
    getProductById,
    getProductsByCategory,
    deleteProduct,
    updateProduct
  };

  async function getAllProducts() {
    const { rows } = await client.query(`
      SELECT * FROM products;
    `)

    for (i=0; i < rows.length; i++) {
      rows[i].photos = await getPhotosByProductId({productId: rows[i].id})
    }

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

  async function getProductsByCategory({ category }) {
    const { rows } = await client.query(`
      SELECT * FROM products
      WHERE category=$1;
    `, [ category ])

    for (i=0; i < rows.length; i++) {
      rows[i].photos = await getPhotosByProductId({productId: rows[i].id})
    }

    return rows
  }

  async function deleteProduct({ id }) {
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

  async function updateProduct({ id, ...fields }) {
    const setString = Object.keys(fields).map(
      (key, index) => `"${key}"=$${ index + 1 }`
    ).join(', ');
  
    if (setString.length === 0) {
      return;
    }

    const { rows: [ product ] } = await client.query(`
      UPDATE products
      SET ${ setString }
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields))

    return product
  }