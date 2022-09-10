// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  makeAdmin,
  getUserById,
  getUserByEmail
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  const { rows } = await client.query(`
    SELECT id, email FROM users;
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

async function getUserById({ id }) {
  const { rows: cart } = await client.query(`
    SELECT id AS cartId, "productId", "productPrice", "productQty" FROM carts
    WHERE "cartUserId"=$1
    AND "isActive"=true;
  `, [ id ])

  const { rows: orders } = await client.query(`
    SELECT orders.id, carts."productId", carts."productPrice", carts."productQty"
    FROM orders
    JOIN carts ON orders.id=carts."orderId"
    WHERE "isUserId"=$1;
  `, [ id ])

  const { rows: [ user ] } = await client.query(`
    SELECT id AS "userId", email FROM users
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