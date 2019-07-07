const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('../../models/userModel');
const Transaction = require('../../models/transactionModel');
const isAuth = require('../../middleware');

const router = express.Router();

router.use(bodyParser.json());

/**
 * @route POST api/buystock
 * @desc Save stock purchase transaction.
 * @access Private
 */
router.post('/api/buyStock', isAuth, (req, res) => {
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

    // Once transaction is saved push its reference into user array
    User.findOneAndUpdate(id, {
        $push: {
            transactions: transaction
        }, 
        $set: {
            funds: req.body.remainingFunds
        }
    }, (err => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    }));
});

/**
 * @route GET api/transData
 * @desc Get stock transactions.
 * @access Private
 */
router.get('/api/transData', isAuth, (req, res) => {
    const id = req.session.userId;
    User
    .findById(id)
    .populate('transactions')
    .exec()
    .then(data =>{
        res.status(200).json(data);
    });
});   

module.exports = router;