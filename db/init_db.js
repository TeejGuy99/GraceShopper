const {
  client,
  User,
  Product
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
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false  
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255),
        price NUMERIC(19,2) NOT NULL,
        "qtyAvailable" INTEGER NOT NULL
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

    // INITIAL USERS DATA*******************************************************************************
    console.log("Starting to create users...");
    const usersToCreate = [
      { email: "ashley@seed.com", password: "ashley01" },
      { email: "dakota@seed.com", password: "dakota01" },
      { email: "kasie@seed.com", password: "kasie01" },
      { email: "tim@seed.com", password: "tim01" },
      { email: "chris@seed.com", password: "chris01" },
    ]
    const users = await Promise.all(usersToCreate.map(User.createUser))

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");

    console.log("Making chris an admin...");
    const userToMakeAdmin = { email: "chris@seed.com" }
    const admin = await User.makeAdmin(userToMakeAdmin)
    console.log("Users made admin:");
    console.log(admin);
    console.log("chris@seed.com made an admin!");
    
    //INITIAL PRODUCTS DATA**********************************************************************
    console.log("Starting to add products...");
    const productsToCreate = [
      { name: "Candle1", description: "This is the first candle for sale", price: 10.99, qtyAvailable: 10 },
      { name: "Candle2", description: "This is the second candle for sale", price: 15.99, qtyAvailable: 20 },
      { name: "Candle3", description: "This is the third candle for sale", price: 8.99, qtyAvailable: 4 },
      { name: "Candle4", description: "This is the fourth candle for sale", price: 49.99, qtyAvailable: 50 },
      { name: "Wax Melt1", description: "This is the first wax melt for sale", price: 5.99, qtyAvailable: 30 },
      { name: "Wax Melt2", description: "This is the second wax melt for sale", price: 5.99, qtyAvailable: 40 },
      { name: "Wax Melt3", description: "This is the third wax melt for sale", price: 9.99, qtyAvailable: 100 },
    ]
    const products = await Promise.all(productsToCreate.map(Product.createProduct))

    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");

  } catch (error) {
    console.error("Error creating initial seed")
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
