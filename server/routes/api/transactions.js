const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('../../models/userModel');
const Transaction = require('../../models/transactionModel');
const isAuth = require('../../middleware');

const router = express.Router();

router.use(bodyParser.json());

/**
 * @route POST api/testrans
 * @desc Save stock purchase transaction.
 * @access Private
 */
router.post('/api/buystock', isAuth, (req, res) => {

    const id = req.session.userId;

    const transaction = new Transaction({
        _id: mongoose.Types.ObjectId(),
        symbol: req.body.symbol,
        totalPaid: req.body.totalPaid,
        pricePerShare: req.body.pricePerShare,
        quantity: req.body.quantity,
        postTime: new Date()
    });
    transaction.save();
    User.findOneAndUpdate(id, {$push: {transactions: transaction}}, (err => {
        if (err) console.log(err);
    }));
});   

module.exports = router;