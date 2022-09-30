// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllPhotos,
    createPhoto,
    getPhotosByProductId,
    updatePhoto
  };

  async function getAllPhotos() {
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

  async function getPhotosByProductId( { productId } ) {
    const { rows: photos } = await client.query(`
      SELECT * FROM photos
      WHERE "productId"=$1;
    `, [ productId ])

    return photos
  }

  async function updatePhoto({ id, ...fields }) {
    const setString = Object.keys(fields).map(
      (key, index) => `"${key}"=$${ index + 1 }`
    ).join(', ');
  
    if (setString.length === 0) {
      return;
    }
  
    const { rows: [ photo ] } = await client.query(`
      UPDATE photos
      SET ${ setString }
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields))
  
    return photo
  }

  async function deletePhoto({ id }) {
    const { rows: [photo] } = await client.query(`
      DELETE FROM photos
      WHERE id=$1
      RETURNING *;
    `, [ id ])
    return photo
  }