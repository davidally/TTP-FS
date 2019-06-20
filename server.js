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
            const { email, pass } = req.body
            // Create new user and log to db
            const enterUser = new User();
            enterUser.email = email; 
            enterUser.password = pass;
            enterUser.save(err => {
                err ? console.log(err) : 'Data has been saved!'
            });
            res.send('success')
        });

        // User Login
        server.post('/api/login', (req, res) => {
            User.find(req.body, (err, user) => {
                if (err){
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    console.log(user);
                    res.status(200).send(user);
                }
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
