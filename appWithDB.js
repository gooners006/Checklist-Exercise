const express = require('express');

const app = express();

app.listen(process.env.PORT || 3001, () => {
    console.log('running');
});

const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'iPhones',
    password: 'vietanh006',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};
const pool = new pg.Pool(config);

const nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM details ORDER BY id ', (err, result) => {
            done();
            if (err) {
                res.end();
                return console.log('error running query', err);
            }
            // console.log(result.rows[0].phonenames);
            res.render('phoneList.html', { data: result });
        });
    });
});
// create
app.get('/addPhone', (req, res) => {
    res.render('addPhone.html');
});
app.post('/addPhone', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        const name = req.body.name;
        const price = req.body.price;
        client.query(
            `INSERT INTO details(phonenames,price) VALUES('${
        name
      }','${
        price
      }')`,
            (err, result) => {
                done();
                if (err) {
                    res.end();
                    return console.log('error running query', err);
                }
                // console.log(result.rows[0].phonenames);
                // res.render('phoneList.html', { data: result });
                res.redirect('../');
            },
        );
    });
});
// update
app.get('/updatePhone/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        const id = req.params.id;
        client.query(
            `SELECT * FROM details WHERE id='${id}'`,
            (err, result) => {
                done();
                if (err) {
                    res.end();
                    console.log('error running query', err);
                }
                console.log(result.rows[0]);
                res.render('updatePhone.html', { phone: result.rows[0] });
            },
        );
    });
});
app.put('/updatePhone', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        const name = req.body.name;
        const price = req.body.price;
        const id = req.body.id;
        client.query(
            `UPDATE details SET phonenames='${
        name
      }',price='${
        price
      }' WHERE id='${
        id
      }'`,
            (err, result) => {
                done();
                if (err) {
                    res.end();
                    return console.log('error running query', err);
                }
                // console.log(result.rows[0].phonenames);
                // res.render('phoneList.html', { data: result });
                res.redirect('../');
            },
        );
    });
});
// delete
app.delete('/deletePhone/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        const id = req.params.id;
        client.query(`DELETE FROM details WHERE id='${id}'`, (err, result) => {
            done();
            if (err) {
                res.end();
                console.log('error running query', err);
            }
            res.redirect('/');
        });
    });
});