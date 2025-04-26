const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { User,Account } = require('../db');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = z.object({
    username: z.string().min(3).max(30).email(),
    password: z.string().min(6),
    firstname: z.string().max(50),
    lastname: z.string().max(50)
})

const signinSchema = z.object({
    username: z.string().min(3).max(30).email(),
    password: z.string().min(6)
})

const updateSchema = z.object({
    password: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional()
})

router.post('/signup', async(req,res) => {
    const { success } = signupSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname

    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random()*1000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin', async(req,res) => {
    const { success } = signinSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "No users found / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user) {
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET)

        return res.json({
            token: token
        })
    }


      res.status(411).json({
        message: "Wrong username/password"
    })

})

router.put('/', authMiddleware, async(req,res) => {
    const { success } = updateSchema.safeParse(req.body);

    if(!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id:req.userId}, req.body)

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstname: { $regex: filter, $options: "i" } },
            { lastname: { $regex: filter, $options: "i" } }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
});

module.exports = router;