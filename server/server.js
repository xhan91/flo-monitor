const express = require('express');
const mysql = require('mysql');
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'josh',
    database: 'flo'
});
connection.connect();

const app = express();

app.get('/', (req, res) => {
    // HTML
    res.send('Hello World!');
});

app.get('/api/stations', (req, res) => {
    const sql = `select * from station`;
    connection.query(sql, (e, r, f) => {
        if (e) console.log(e);
        res.send(JSON.stringify(r));
    });
});

app.get('/api/enable_notice', (req, res) => {
    const sql = `select * from app_status where id = 1`;
    connection.query(sql, (e, r, f) => {
        if (e) console.log(e);
        res.send(JSON.stringify(r));
    });
});

app.post('/api/enable_notice', (req, res) => {
    const to_set = req.body();
    const sql = `update app_status set is_notice_needed = ${to_set} where id = 1`;
    connection.query(sql, (e, r, f) => {
        if (e) console.log(e);
        res.send(JSON.stringify(r));
    });
});

app.listen(port, () => {
    console.log(`Server up at ${port}`);
});