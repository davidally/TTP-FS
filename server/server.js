const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const next = require('next');
const mongoose = require('mongoose');
const morgan = require('morgan');
const isAuth = require('./middleware');

// Load env config
dotenv.config({ path: './config.env'});
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Connect to Mongo Atlas cluster DB
 * @see mongodb://127.0.0.1:27017/appdatabase
 */
const db = mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
.then(()=> console.log('\nMongoDB is connected!'))
.catch(err => console.log(err));

app
    .prepare()
    .then(() => {
        const server = express();

        /********************START: Middleware***********************/
        process.env.NODE_ENV === 'development' ? server.use(morgan('dev')) : null 
        server.use(bodyParser.json());
        server.use(session({
            secret: `${process.env.SECRET}`,
            resave: true,
            saveUninitialized: false
        }));
        server.use('/user', require('./routes/api/user'));
        server.use('/transaction', require('./routes/api/transaction'));
        /***********************END: Middleware************************/

        // NEXT rendering
        server.get('/', (req, res) => {
            app.render(req, res, '/index');
        });

        server.get('/about', (req, res) => {
            app.render(req, res, '/about');
        });

        server.get('/dashboard', isAuth, (req, res) => {
            app.render(req, res, '/dashboard');
        });

        server.get('/purchases', isAuth, (req, res) => {
            app.render(req, res, '/purchases');
        });

        // Everything else handled by NEXT
        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(process.env.PORT, err => {
            if (err) throw err;
            console.log(`*Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}*\n`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });