// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  makeAdmin,
  removeAdmin,
  getUserById,
  getUserByEmail,
  updateUser,
  checkAdmin
};

async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT id, email, "isAdmin" FROM users;
  `)
  return rows
}

async function createUser({ email, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  const { rows: [ user ] } = await client.query(`
    INSERT INTO users(email, password)
    VALUES ($1, $2)
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email;
  `, [ email, hashedPassword ]);

  return user
}

async function makeAdmin({ email }) {
  const { rows: [ admin ] } = await client.query(`
    UPDATE users
    SET "isAdmin" = true
    WHERE email = $1
    RETURNING email, "isAdmin";
  `, [ email ])
  return admin
}

async function removeAdmin({ email }) {
  const { rows: [ admin ] } = await client.query(`
    UPDATE users
    SET "isAdmin" = false
    WHERE email = $1
    RETURNING email, "isAdmin";
  `, [ email ])
  return admin
}

async function getUserById({ id }) {
  const { rows: cart } = await client.query(`
    SELECT carts.id AS cartId, carts."productId", carts."productPrice", carts."productQty", products.name AS "productName"
    FROM carts
    JOIN products ON carts."productId"=products.id
    WHERE "cartUserId"=$1
    AND "isActive"=true;
  `, [ id ])

  const { rows: orders } = await client.query(`
    SELECT orders.id, carts."productId", carts."productPrice", carts."productQty", products.name AS "productName", photos.description, photos.link
    FROM orders
    FULL JOIN carts ON orders.id=carts."orderId"
    FULL JOIN products ON carts."productId"=products.id 
    FULL JOIN photos ON carts."productId"=photos."productId"
    WHERE "isUserId"=$1;
  `, [ id ])

  const { rows: [ user ] } = await client.query(`
    SELECT id AS "userId", email, "isAdmin" FROM users
    WHERE id = $1;
  `, [ id ])

  user.cart = cart
  user.orders = orders

  return user
}

async function getUserByEmail(email) {
  const { rows: [ user ] } = await client.query(`
    SELECT *
    FROM users
    WHERE email=$1;
  `, [email]);


  if(!user) {
    return null;
  }

  return user;
}

async function updateUser({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${ index + 1 }`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }

  const { rows: [ user ] } = await client.query(`
    UPDATE users
    SET ${ setString }
    WHERE id=${id}
    RETURNING *;
  `, Object.values(fields))

  return user
}

async function checkAdmin({ id }) {
  const { rows: [ admin ] } = await client.query(`
    SELECT "isAdmin"
    FROM users
    WHERE id=$1;
  `, [id])
}