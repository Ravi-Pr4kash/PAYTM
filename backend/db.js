import { string } from "zod";

const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@paytm.axou3he.mongodb.net/"
    );
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Error connection to MongoDB", e);
  }
};

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: string,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: { type: String, required: true, minLength: 6 },
  firstname: { type: String, required: true, trim: true, maxLength: 50 },
  lastname: { type: String, required: true, trim: true, maxLength: 50 },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};

connection();
