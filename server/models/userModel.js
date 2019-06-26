const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const saltRounds = 10;

const User = new Schema({
    id: ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    funds: {type: Number, required: true}
});

User.pre('save', function(next) {
        if (this.isNew || this.isModified('password')) {
            const document = this;
            bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
                if (err){
                    next(err);
                } else {
                    document.password = hashedPassword;
                    next();
                }
            });
        } else {
            next();
        }
    });

User.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if (err){
           callback(err);
        } else {
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('Users', User);