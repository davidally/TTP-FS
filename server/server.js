const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Database modules
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/appdatabase', { useNewUrlParser: true});

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
        server.use(session({
            secret: 'work hard',
            resave: true,
            saveUninitialized: false
        }));
        // server.use(isAuth);
        server.use(userAPI);

        server.get('/api/test', isAuth, (req, res) =>{
            console.log(`\nUser: ${req.session.userId} is authenticated!\n`);
            console.log("Session ID:", req.session.id);
            console.log(req.session);
            res.sendStatus(200);
        });

        server.get('/logout', function(req, res, next) {
            if (req.session) {
              // delete session object
              req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                } else {
                    return res.clearCookie('connect.sid', { path: '/'}).redirect('/');
                }
              });
            }
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
            console.log('\nREADY ON LOCALHOST! Starting...\n');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
