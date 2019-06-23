const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const sessionAuth = require('../../../server/middleware');

const secret = 'devsecret';

const router = express.Router();

router.use(bodyParser.json());
router.use(cookieParser());


/**
 * @TODO Create route to check if user is authenticated with token.
 * Then go to the navigation and render a logout button based on if the token is found.
 * Create a logout route that destroys the JWT. Possibly need to find another solution
 * for authentication. Might need to remove JWT, middleware, and associated variables.
 */
router.get('/api/access', sessionAuth, (req, res) => {
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
    let setBody;
    /**
     * Mongoose queries are executed asynchronously if passing a callback.
     * The chain is continued past initial block (acts as pending) via exec and then.
     * This is when the query is finished and initial callback
     * is finally executed. 
     */
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
                    console.log('\nUSER HAS BEEN AUTHENTICATED!\n');
                    // Perform auth in this block
                    const payload = { email };
                    // JWT async sign
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    /**
                     * Set cookie property Secure to true in order to use HTTPS.
                     * Cookie sets HTTP headers and so will be the end of the response chain.
                     */
                    console.log('Response body set:', setBody);
                    res.cookie('token', token, { httpOnly: true}).status(200).send({name: setBody});
                }
            });
        }
    })
    .exec()
    .then(data => {
        setBody = data.name
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;