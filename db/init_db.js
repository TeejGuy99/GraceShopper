const {
  client,
  User,
  Product,
  Review,
  Guest,
  Photo,
  Order,
  Cart
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
      DROP TABLE IF EXISTS product_photos;
      DROP TABLE IF EXISTS product_reviews;
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS photos;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS guests;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    console.log("Finished building tables!");
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
        "qtyAvailable" INTEGER NOT NULL,
        category VARCHAR(255) NOT NULL
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id),
        name VARCHAR(255),
        description VARCHAR(1000) UNIQUE NOT NULL
      );

      CREATE TABLE guests (
        id SERIAL PRIMARY KEY,
        "isActive" BOOLEAN DEFAULT true
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "isUserId" INTEGER REFERENCES users(id),
        "isGuestId" INTEGER REFERENCES guests(id)
      );

      CREATE TABLE photos (
        id SERIAL PRIMARY KEY,
        description VARCHAR(1000) NOT NULL,
        link VARCHAR(1000) NOT NULL
      );

      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        "productPrice" NUMERIC(19,2),
        "productId" INTEGER REFERENCES products(id),
        "productQtyAvailable" INTEGER,
        "productQty" INTEGER CHECK ("productQty" <= "productQtyAvailable"),
        "cartUserId" INTEGER REFERENCES users(id),
        "cartGuestId" INTEGER REFERENCES guests(id),
        "isActive" BOOLEAN DEFAULT true 
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
      { name: "Candle1", description: "This is the first candle for sale", price: 10.99, qtyAvailable: 10, category: "Candle" },
      { name: "Candle2", description: "This is the second candle for sale", price: 15.99, qtyAvailable: 20, category: "Candle" },
      { name: "Candle3", description: "This is the third candle for sale", price: 8.99, qtyAvailable: 4, category: "Candle" },
      { name: "Candle4", description: "This is the fourth candle for sale", price: 49.99, qtyAvailable: 50, category: "Candle" },
      { name: "Wax Melt1", description: "This is the first wax melt for sale", price: 5.99, qtyAvailable: 30, category: "Wax Melt" },
      { name: "Wax Melt2", description: "This is the second wax melt for sale", price: 5.99, qtyAvailable: 40, category: "Wax Melt" },
      { name: "Wax Melt3", description: "This is the third wax melt for sale", price: 9.99, qtyAvailable: 100, category: "Wax Melt" },
    ]
    const products = await Promise.all(productsToCreate.map(Product.createProduct))

    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");

    //INITIAL REVIEWS DATA**********************************************************************
    console.log("Starting to add reviews...");
    const reviewsToCreate = [
      { creatorId: 1, name: "Review 1", description: "This is the first review" },
      { creatorId: 3, name: "Review 2", description: "This is the second review" },
      { creatorId: 4, name: "Review 3", description: "This is the third review" },
      { creatorId: 2, name: "Review 4", description: "This is the fourth review" },
    ]
    const reviews = await Promise.all(reviewsToCreate.map(Review.createReview))

    console.log("Reviews created:");
    console.log(reviews);
    console.log("Finished creating reviews!");

    //INITIAL GUESTS DATA**********************************************************************
    console.log("Starting to create guests...");
    const guestsToCreate = [
      { isActive: false },
      { isActive: true },
      { isActive: false },
    ]
    const guests = await Promise.all(guestsToCreate.map(Guest.createGuest))

    console.log("Guests created:");
    console.log(guests);
    console.log("Finished creating guests!");

    //INITIAL ORDERS DATA**********************************************************************
    console.log("Starting to create orders...");
    const ordersToCreate = [
      { isUserId: 2 },
      { isGuestId: 2 },
      { isUserId: 5 },
    ]
    const orders = await Promise.all(ordersToCreate.map(Order.createOrder))

    console.log("Orders created:");
    console.log(orders);
    console.log("Finished creating orders!!");

    //INITIAL PHOTOS DATA**********************************************************************
    console.log("Starting to create photos...");
    const photosToCreate = [
      { description: "Candle 1", link: "https://image.shutterstock.com/image-photo/luxury-lighting-aromatic-scent-candle-260nw-1908721786.jpg"},
      { description: "Candle 2", link: "https://image.shutterstock.com/image-photo/burning-candles-on-table-indoors-600w-1124996348.jpg"},
      { description: "Candle 3", link: "https://image.shutterstock.com/image-photo/cozy-home-interior-decor-burning-600w-1037164117.jpg"},
    ]
    const photos = await Promise.all(photosToCreate.map(Photo.createPhoto))

    console.log("Photos created:");
    console.log(photos);
    console.log("Finished creating photos!");

    //INITIAL CARTS DATA**********************************************************************
    console.log("Starting to create carts...");
    const cartsToCreate = [
      { productId: 1, productQty: 3, cartUserId: 5 },
      { productId: 3, productQty: 3, cartGuestId: 2 },
      { productId: 6, productQty: 3, cartUserId: 3 },
    ]
    const carts = await Promise.all(cartsToCreate.map(Cart.addToCart))

    console.log("Carts created:");
    console.log(carts);
    console.log("Finished creating carts!");

    console.log("Checking the cart belonging to user with id=5:");
    const userWithCart = await User.getUserById({ id: 5})
    console.log(userWithCart);
    console.log("Finished checking cart!");

    
  } catch (error) {
    console.error("Error creating initial seed")
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
