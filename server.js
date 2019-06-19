const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();-
// Mapping custom route and params to post
        server.get('/stock/:id', (req, res) => {
            console.log(req);
            const actualPage = '/post';
            const queryParams = { 
                id: req.params.id
             };
            app.render(req, res, actualPage, queryParams);
        });

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
