const jwt = require('jsonwebtoken')
const express = require('express')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const  authMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1]

    try{

        const decoded = jwt.verify(token, JWT_SECRET)


        if(decoded.userId) {
            req.userId = decoded.userId 
            next();
        } else {
            res.status(403).json({})
        }

       
    }catch(err){
        return res.status(403).json({});
    }
}

module.exports = authMiddleware;