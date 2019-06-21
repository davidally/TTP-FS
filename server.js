const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const db = mongoose.connect('mongodb://127.0.0.1:27017/appdatabase', { useNewUrlParser: true});
const User = require('./models/users');

app
    .prepare()
    .then(() => {
        const server = express();

        // Custom routes
        server.use(bodyParser.json());

        // Dynamic Pages - Routing for NEXT Link component
        server.get('/stock/:id', (req, res) => {
            const queryParams = { 
                id: req.params.id
             };
            app.render(req, res, '/post', queryParams);
        });

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
                console.log(feedback);
                res.status(201).json({
                    message: 'Post request went through.',
                    newUser: userProfile
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
        server.post('/api/login', (req, res) => {
            const id = req.body.email
            User.find({email: id})
            .exec()
            .then(item => {
                // Send back 200 if user is found in database and authenticate
                console.log(item);
                if (item) {
                    res.status(200).json({
                        message: 'Data successfully fetched!',
                        userAcc: item
                    });
                } else {
                    res.status(404).json({
                        message: 'No valid entry could be found.'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
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
