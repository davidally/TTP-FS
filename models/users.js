const mongoose = require('mongoose')
const schema = mongoose.Schema

const User = new schema({
    name: {type: String},
    email: {type: String},
    password: {type: String}
})

module.exports = mongoose.model('users', User);