const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");
const { User, Account } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId
  });

  res.status(200).send({
    Balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
   //Sessions are needed when you want to do transactions — 
   //meaning you want multiple DB operations to either ALL succeed or ALL fail together (like a package deal)
   const session = await mongoose.startSession();

   session.startTransaction();
   
   const {amount, to} = req.body;

   const account = await Account.findOne({userId: req.userId}).session(session)

   if(!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
        message: "Insufficient balance/account does't exist"
    })
   }

   const toAccount = await Account.findOne({userId: to}).session(session);

   if(!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
        message: "Invalid account"
    })
   }

   await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
   await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

   await session.commitTransaction();
   res.json({
       message: "Transfer successful"
   });
});

module.exports = router;
