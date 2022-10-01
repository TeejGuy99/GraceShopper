const jwt = require("jsonwebtoken");
const { User, Guest } = require("../db");
const { JWT_SECRET } = process.env;

const express = require("express");
const apiRouter = express.Router();
apiRouter.use(express.json());
const cors = require("cors");
apiRouter.use(cors());

// USE THIS BLOCK IF WE DO AUTHENTICATION THROUGH HEADERS
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await User.getUserById({ id: id });
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

const { Router } = require("express");
// place your routers here

// ROUTER: /api/user
const userRouter = require("./user");
apiRouter.use("/user", userRouter);

//ROUTER: /api/product
const productRouter = require("./product");
apiRouter.use("/product", productRouter);

//ROUTER: /api/order
const orderRouter = require("./order");
apiRouter.use("/order", orderRouter);

//ROUTER: /api/photo
const photoRouter = require("./photo");
apiRouter.use("/photo", photoRouter);

//ROUTER: /api/review
const reviewRouter = require("./review");
apiRouter.use("/review", reviewRouter);

//ROUTER: /api/guest
const guestRouter = require("./guest");
apiRouter.use("/guest", guestRouter);

//ROUTER: /api/cart
const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

apiRouter.use("*", function (req, res, next) {
  res.status(404).send({ message: "Route could not be found" });
});

apiRouter.use((error, req, res, next) => {
  res.send({
    error: "There was an error",
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
