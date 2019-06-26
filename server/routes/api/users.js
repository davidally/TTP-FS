const express = require("express");
const bodyParser = require("body-parser");
const User = require('../../models/userModel');
const isAuth = require('../../middleware');

const router = express.Router();

router.use(bodyParser.json());

/**
 * @route POST api/register
 * @desc Register user account.
 * @access Public
 */
router.post('/api/register', (req, res) => {
    // Create new user and log to db
    const userProfile = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.pass,
        funds: 5000
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
 * @route POST api/authenticate
 * @desc User login/authentication.
 * @access Public
 * Mongoose queries are executed asynchronously if passing a callback.
 * The chain is continued past initial block (acts as pending) via exec and then.
 * This is when the query is finished and initial callback
 * is finally executed. 
 */
router.post('/api/authenticate', (req, res) => {
    const { email, pass } = req.body
    let userID;
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
                    req.session.userId = userID;
                    res.sendStatus(200);
                }
            });
        }
    })
    .exec()
    .then(data => {
        userID = data._id;
    })
    .catch(err => {
        console.log(err);
    })
});

/**
 * @route GET api/data
 * @desc Query db and return user data.
 * @access Private
 */
router.get('/api/data', isAuth, (req, res) => {
    const id = req.session.userId;
    User.findById(id, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'ERR: Internal error, try again.'});
        }
    })
    .exec()
    .then(data => {
        const username = data.name;
        const userFunds = data.funds;
        const userEmail = data.email;
        res.send({name: username, email: userEmail, funds: userFunds});
    })
    .catch(err => {
        console.log(err);
    });
});

/**
 * @route GET api/data
 * @desc Logout - Destroys user session used for authentication.
 * @access Public
 */
router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
            return next(err);
        } else {
            setTimeout(() => {
                return res.clearCookie('connect.sid', { path: '/'}).redirect('/');
            }, 2000);
        }
      });
    }
});

module.exports = router;