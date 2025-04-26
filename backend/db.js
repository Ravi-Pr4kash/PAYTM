const mongoose = require('mongoose')
const { string } = require('zod')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, trim: true, lowercase: true, minLength:3,maxLength:30},
    password: {type: String,required: true,minLength: 6},
    firstname: {type: String,required: true,trim: true, maxLength: 50},
    lastname: { type: String,required: true,trim: true,maxLength: 50}
})

const accountSchema = new mongoose.Schema({
    balance: {type: Number, required: true},
    userId: {type: mongoose.Schema.ObjectId, ref: "User", required: true}
})

const User = mongoose.model("User", userSchema)  
const Account = mongoose.model("Account", accountSchema)

module.exports = {
    User,
    Account
}