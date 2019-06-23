const express = require("express");
const bodyParser = require("body-parser");
const User = require('../../models/userModel');


const router = express.Router();

router.use(bodyParser.json());

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

/**
 * User Login
 * Mongoose queries are executed asynchronously if passing a callback.
 * The chain is continued past initial block (acts as pending) via exec and then.
 * This is when the query is finished and initial callback
 * is finally executed. 
 */
router.post('/api/authenticate', (req, res) => {
    const { email, pass } = req.body
    let setBody;
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
                    // Identify user by their ID and share with session
                    // console.log('\nUSER HAS BEEN AUTHENTICATED!\n');
                    req.session.userId = setBody;
                    res.status(200).send({name: "setBody"});
                }
            });
        }
    })
    .exec()
    .then(data => {
        setBody = data._id;
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;