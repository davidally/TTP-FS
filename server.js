const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const db = mongoose.connect('mongodb://127.0.0.1:27017/appdatabase', { useNewUrlParser: true});
const User = require('./models/users');
const sessionAuth = require('./middleware');
const secret = 'devsecret';

app
    .prepare()
    .then(() => {
        const server = express();

        // Custom routes
        server.use(bodyParser.json());
        server.use(cookieParser());

        // Dynamic Pages - Routing for NEXT Link component
        server.get('/stock/:id', (req, res) => {
            const queryParams = { 
                id: req.params.id
             };
            app.render(req, res, '/post', queryParams);
        });

        server.get('/account', sessionAuth, (req, res) => {
            res.send('Test if this protected route works.')
        })

        // Register Account
        server.post('/api/register', (req, res) => {
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
                    message: 'Post request went through.'
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
        server.post('/api/authenticate', (req, res) => {
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
                            console.log('USER HAS BEEN AUTHENTICATED!\n');
                            // Add .sendStatus(200) to cookie set
                            res.cookie('token', token, { httpOnly: true}).sendStatus(200);
                        }
                    });
                }
            })
            .exec()
            .then(item => {
                console.log("RUNNING TESTING...\n");
                res.body = {name: item.name};
                console.log(res.body);
            })
            .catch(err => {
                console.log(err);
            })
        });

        // Routes handled by Next
        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('READY ON LOCALHOST! Starting...');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
