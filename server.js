const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const Users = require('./models/users');
const db = mongoose.connect('mongodb://127.0.0.1:27017/appdatabase', { useNewUrlParser: true});

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
            // Connect db and enter data
            console.log(req.body)
            res.send('success')
        });

        // User Login
        server.get('/api/login', (req, res) => {
            const { email, pass } = req.body
            console.log(req.body)
            res.send('success')
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
