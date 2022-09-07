const {
  client,
  User
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    console.log("Connecting to client");
    client.connect();

    console.log('Dropping All Tables...');
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS users
    `)
    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `)
    console.log("Finished building tables");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
