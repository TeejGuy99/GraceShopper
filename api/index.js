const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { JWT_SECRET } = process.env;

const express = require('express')
const apiRouter = express.Router();
apiRouter.use(express.json());
const cors = require('cors');
apiRouter.use(cors())

// USE THIS BLOCK IF WE DO AUTHENTICATION THROUGH HEADERS
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await User.getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

const { Router } = require('express');
// place your routers here

// ROUTER: /api/user
const userRouter = require('./user');
apiRouter.use('/user', userRouter);

const productRouter = require('./product');
apiRouter.use('/product', productRouter);


apiRouter.use((error, req, res, next) => {
  res.send({
    error: "There was an error",
    name: error.name,
    message: error.message
  })
})

module.exports = apiRouter;
