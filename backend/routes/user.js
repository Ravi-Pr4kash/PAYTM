const express = require('express')
const router = express.Router();
const zod = require('zod')
const { User }  = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET }  = require('../config')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const signupBody = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post('/signup',async(req,res) => {
    const {success} = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken/incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken/incorrect inputs"
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const dbUser = await User.create({
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    const token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
})





router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Invalid input"
        });
    }

    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
        return res.status(411).json({
            message: "Invalid credentials"
        });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        return res.status(411).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

    res.status(200).json({
        message: "Signed in successfully",
        token
    });
});