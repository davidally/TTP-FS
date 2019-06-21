const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const User = new Schema({
    id: ObjectId,
    name: {type: String},
    email: {type: String},
    password: {type: String}
})

module.exports = mongoose.model('Users', User);