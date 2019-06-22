const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const sessionAuth = require('./middleware');
const secret = 'devsecret';

const router = express.Router();

router.use(bodyParser.json());
router.use(cookieParser());

router.get('/api/accountData', sessionAuth, (req, res) => {
    res.status(200).send({xyz: "test"});
});


// Register Account
router.post('/api/register', (req, res) => {
    // Create new user and log to db
    const userProfile = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.pass
    });
    userProfile
    .save()
    .then(feedback => {
        res.status(201).json({
            message: 'User was created successfully.'
        });   
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })

});

// User Login
router.post('/api/authenticate', (req, res) => {
    const { email, pass } = req.body
    User.findOne({ email }, (err, user) =>{
        if (err) {
            console.log(err);
            res.status(500).json({error: 'ERR: Internal error, try again. (A)'});
        } else if (!user){
            res.status(401).json({error: 'Incorrect email or password.'});
        } else {
            user.isCorrectPassword(pass, function(err, same){
                if (err) {
                    res.status(500).json({error: 'ERR: Internal error, try again. (B)'});
                } else if (!same) {
                    res.status(401).json({error: 'Your password was incorrect.'});
                } else {
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    console.log('\nUSER HAS BEEN AUTHENTICATED!\n');
                    res.cookie('token', token, { httpOnly: true}).sendStatus(200);
                }
            });
        }
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;