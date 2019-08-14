const mongoose = require("mongoose");
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

exports.make_stock_purchase = (req, res) => {
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
};

exports.get_stock_transactions = (req, res) => {
    const id = req.session.userId;
    User
    .findById(id)
    .populate('transactions')
    .exec()
    .then(data =>{
        res.status(200).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(404);
    });
};

exports.add_five_funds = (req, res) => {
    const id = req.session.userId;

    User.findOneAndUpdate(id, {
        $inc: {
            funds: req.body.funds
        }
    }, (err => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    }));
};