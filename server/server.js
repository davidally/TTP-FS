const express = require('express');
const next = require('next');
const http = require('http');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Database modules
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/appdatabase', { useNewUrlParser: true});

// Authentication modules
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const uid = require('uid-safe');

// Custom APIs
const userAPI = require('./routes/api/users');
const authRoutes = require('./routes/authorized');

app
    .prepare()
    .then(() => {
        const server = express();

        // // Session management
        // const sessionConfig = {
        //     secret: uid.sync(18),
        //     cookie: {
        //       maxAge: 86400 * 1000 // 24 hours in milliseconds
        //     },
        //     resave: false,
        //     saveUninitialized: true
        // };

        // server.use(session(sessionConfig));

        // // Configure Auth0
        // const auth0Strategy = new Auth0Strategy(
        //     {
        //       domain: process.env.AUTH0_DOMAIN,
        //       clientID: process.env.AUTH0_CLIENT_ID,
        //       clientSecret: process.env.AUTH0_CLIENT_SECRET,
        //       callbackURL: process.env.AUTH0_CALLBACK_URL
        //     },
        //     function(accessToken, refreshToken, extraParams, profile, done) {
        //       return done(null, profile);
        //     }
        //   );

        // //   Configure Passport
        // passport.use(auth0Strategy);
        // passport.serializeUser((user, done) => done(null, user));
        // passport.deserializeUser((user, done) => done(null, user));

        // server.use(passport.initialize());
        // server.use(passport.session());
        
        // server.use(authRoutes);

        // // Restrict routes
        // const restrictAccess = (req, res, next) => {
        //     if (!req.isAuthenticated()) return res.redirect("/");
        //     next();
        //   };

        // server.use('/dashboard', restrictAccess);

        // Custom routes
        server.use(userAPI);

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
