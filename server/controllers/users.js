const User = require('../models/userModel');

exports.register_user = (req, res) => {
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

};

exports.authenticate_user = (req, res) => {
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
};

exports.get_user_data = (req, res) => {
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
};

exports.user_logout = (req, res, next) => {
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
};