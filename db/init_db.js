const {
  client,
  User,
  Product,
  Review,
  Guest,
  Photo,
  Order,
  Cart,

  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();

    await client.query(`
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS photos;
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS guests;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);

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
        "productId" INTEGER REFERENCES products(id),
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
        link VARCHAR(1000) NOT NULL,
        "productId" INTEGER REFERENCES products(id)
      );

      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        "productPrice" NUMERIC(19,2),
        "productId" INTEGER REFERENCES products(id),
        "productQtyAvailable" INTEGER,
        "productQty" INTEGER CHECK ("productQty" <= "productQtyAvailable"),
        "cartUserId" INTEGER REFERENCES users(id),
        "cartGuestId" INTEGER REFERENCES guests(id),
        "isActive" BOOLEAN DEFAULT true,
        "orderId" INTEGER
      );

    `);
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
    const adminIsFirst = { email: "admin@seed.com", password: "admin01" };
    const usersToCreate = [
      { email: "ashley@seed.com", password: "ashley01" },
      { email: "dakota@seed.com", password: "dakota01" },
      { email: "kasie@seed.com", password: "kasie01" },
      { email: "tim@seed.com", password: "tim01" },
      { email: "chris@seed.com", password: "chris01" },
    ];
    const adminWasFirst = await User.createUser(adminIsFirst);
    const users = await Promise.all(usersToCreate.map(User.createUser));

    const userToMakeAdmin = { email: "admin@seed.com" };
    const admin = await User.makeAdmin(userToMakeAdmin);

    //INITIAL PRODUCTS DATA**********************************************************************
    const productsToCreate = [
      {
        name: "Magic Hour",
        description: "Feels like your in the hour of magic whenever.",
        price: 18.99,
        qtyAvailable: 20,
        category: "Candle",
      },
      {
        name: "Witching Hour",
        description: "Bewitch yourself in the hour of magical scent.",
        price: 18.99,
        qtyAvailable: 20,
        category: "Candle",
      },
      {
        name: "Night Cap",
        description:
          "Tip the cap and you will be gifted the nightly scents in your dreams.",
        price: 18.99,
        qtyAvailable: 20,
        category: "Candle",
      },
      {
        name: "Dusk",
        description:
          "The scent of almost Night time, but not quite yet but not Day time either, you know?",
        price: 18.99,
        qtyAvailable: 20,
        category: "Candle",
      },
      {
        name: "Summer Citrus",
        description: "Orange you glad this smells good!",
        price: 5.99,
        qtyAvailable: 25,
        category: "Wax Melt",
      },
      {
        name: "Jasmine Cedarwood",
        description: "Thats what she said. ;)",
        price: 5.99,
        qtyAvailable: 25,
        category: "Wax Melt",
      },
      {
        name: "Ginger Tea Honey",
        description: "Get that Ginger Tea my Honey.",
        price: 5.99,
        qtyAvailable: 25,
        category: "Wax Melt",
      },
      {
        name: "Apple Cinnamon",
        description: "Closest thing to my grandmas Apple pie.",
        price: 5.99,
        qtyAvailable: 25,
        category: "Wax Melt",
      },
    ];
    const products = await Promise.all(
      productsToCreate.map(Product.createProduct)
    );

    //INITIAL REVIEWS DATA**********************************************************************
    // const reviewsToCreate = [
    //   {
    //     creatorId: 1,
    //     productId: 1,
    //     name: "Review 1",
    //     description: "This is the first review",
    //   },
    //   {
    //     creatorId: 3,
    //     productId: 2,
    //     name: "Review 2",
    //     description: "This is the second review",
    //   },
    //   {
    //     creatorId: 4,
    //     productId: 3,
    //     name: "Review 3",
    //     description: "This is the third review",
    //   },
    //   {
    //     creatorId: 2,
    //     productId: 1,
    //     name: "Review 4",
    //     description: "This is the fourth review",
    //   },
    // ];
    // const reviews = await Promise.all(reviewsToCreate.map(Review.createReview));

    //INITIAL GUESTS DATA**********************************************************************
    const guestsToCreate = [
      { isActive: false },
      { isActive: true },
      { isActive: false },
    ];
    const guests = await Promise.all(guestsToCreate.map(Guest.createGuest));

    //INITIAL PHOTOS DATA**********************************************************************
    const photosToCreate = [
      {
        description: "Magic Hour",
        link: "https://i.imgur.com/bbrvf8c.jpg",
        productId: 1,
      },
      {
        description: "Witching Hour",
        link: "https://i.imgur.com/lMP3k69.jpg",
        productId: 2,
      },
      {
        description: "Night Cap",
        link: "https://i.imgur.com/ZT294Xd.jpg",
        productId: 3,
      },
      {
        description: "Dusk",
        link: "https://i.imgur.com/yyAWGS4.jpg",
        productId: 4,
      },
      {
        description: "Summer Citrus",
        link: "https://i.imgur.com/IgI1HyB.jpg",
        productId: 5,
      },
      {
        description: "Jasmine Cedarwood",
        link: "https://i.imgur.com/BIj4hkj.jpg",
        productId: 6,
      },
      {
        description: "Ginger Tea Honey",
        link: "https://i.imgur.com/MDMrUpi.jpg",
        productId: 7,
      },
      {
        description: "Apple Cinnamon",
        link: "https://i.imgur.com/yj0kRZ3.jpg",
        productId: 8,
      },
    ];
    const photos = await Promise.all(photosToCreate.map(Photo.createPhoto));

    //INITIAL CARTS DATA**********************************************************************
    const cartsToCreate = [
      { productId: 1, productQty: 3, cartUserId: 5 },
      { productId: 3, productQty: 3, cartGuestId: 2 },
      { productId: 6, productQty: 3, cartUserId: 3 },
      { productId: 2, productQty: 5, cartUserId: 5 },
    ];
    const carts = await Promise.all(cartsToCreate.map(Cart.addToCart));

    const userWithCart = await User.getUserById({ id: 5 });

    //INITIAL ORDERS DATA**********************************************************************
    let orders = [];
    const firstOrderToCreate = { isUserId: 5 };
    const firstOrder = await Order.createOrderFromCart(firstOrderToCreate);
    orders.push(firstOrder);
    const secondOrderToCreate = { isGuestId: 2 };
    const secondOrder = await Order.createOrderFromCart(secondOrderToCreate);
    orders.push(secondOrder);
    const thirdOrderToCreate = { isUserId: 3 };
    const thirdOrder = await Order.createOrderFromCart(thirdOrderToCreate);
    orders.push(thirdOrder);

    //TRY ADDING CART TO ORDER*********************************************************************
    const userId5Cart = await User.getUserById({ id: 5 });

    const userId5NewCart = await Cart.addToCart({
      productId: 2,
      productQty: 3,
      cartUserId: 5,
    });

    const onlyCandles = await Product.getProductsByCategory({
      category: "Candle",
    });
  } catch (error) {
    console.error("Error creating initial seed");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
