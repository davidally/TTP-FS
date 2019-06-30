const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Transaction = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    symbol: { type: String, required: true },
    totalPaid: { type: Number, required: true },
    pricePerShare: { type: Number, required: true },
    quantity: { type: Number, required: true },
    postTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', Transaction);