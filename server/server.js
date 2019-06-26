const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Database modules
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/appdatabase', { useNewUrlParser: true})
.then(()=> console.log('\nMongoose is connected!'))
.catch(err => console.log(err));

// Authentication modules
const isAuth = require('./middleware');
const session = require('express-session');

// Custom APIs
const userAPI = require('./routes/api/users');

app
    .prepare()
    .then(() => {
        const server = express();

        // Custom modules
        // Configure session cookies to be secure by making sure the site uses HTTPS
        server.use(session({
            secret: 'work hard',
            resave: true,
            saveUninitialized: false
        }));

        server.use(userAPI);

        server.get('/', (req, res) => {
            app.render(req, res, '/index');
        });

        server.get('/about', (req, res) => {
            app.render(req, res, '/about');
        });

        server.get('/dashboard', isAuth, (req, res) => {
            app.render(req, res, '/dashboard');
        });

        // Dynamic Pages - Routing for NEXT Link component
        server.get('/stock/:id', (req, res) => {
            const queryParams = { 
                id: req.params.id
             };
            app.render(req, res, '/post', queryParams);
        });

        // Everything else handled by Next
        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('READY ON LOCALHOST! Starting...\n');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
