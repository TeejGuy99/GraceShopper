// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  makeAdmin
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  const { rows } = await client.query(`
    SELECT * FROM users;
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