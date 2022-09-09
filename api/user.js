const express = require('express');
const router = express.Router();
const { User } = require('../db');
const bcrypt = require('bcrypt');

// POST /api/user/login
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next({
            name: "MissingCredientialsError",
            message: "Please supply both an email and password"
        });
    }

    try {
        const user = await User.getUserByEmail(email);
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (user&&passwordsMatch) {
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)
            delete user.password;
            delete user.isAdmin;
            res.send({ user: user, message: "you're logged in!", token: token });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Email or password is incorrect'
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// POST /api/user/register
router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;
    const jwt = require('jsonwebtoken');
    try {
        const _user = await User.getUserByEmail(email);
        if(_user) { 
            next({
                name: 'UserExistsError',
                message: `Email ${email} has already been registered.`
            });
        }

        if(password.length<5) {
            next({
                name: 'PasswordTooShortError',
                message: 'Password Too Short!'
            })
        }

        const user = await User.createUser({
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: "thank you for signing up",
            token: token,
            user: user
        });
    } catch ({ name, message }) {
        next({ name, message })
    }
});

// GET /api/user
router.get('/', async(req, res, next) => {
    try {
        const users = await User.getAllUsers();

        res.send(users)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;