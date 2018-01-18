const express = require('express');
const mysql = require('mysql');
const path = require('path');
const port = 3000;
const getConnection = require('../db/connection').getConnection;

const app = express();

const build = path.resolve(__dirname + '/../fe/build/');

app.get('/', (req, res) => {
    // HTML
    res.sendFile(build + '/index.html');
});

app.get('/api/stations', (req, res) => {
    const sql = `select * from station`;
    getConnection((connection) => {
        connection.query(sql, (e, r, f) => {
            if (e) console.log(e);
            res.send(JSON.stringify(r));
            connection.release();
        });
    });
});

app.get('/api/enable_notice', (req, res) => {
    const sql = `select * from app_status where id = 1`;
    getConnection((connection) => {    
        connection.query(sql, (e, r, f) => {
            if (e) console.log(e);
            res.send(JSON.stringify(r));
            connection.release();
        });
    });
});

app.post('/api/enable_notice', (req, res) => {
    const to_set = req.body();
    const sql = `update app_status set is_notice_needed = ${to_set} where id = 1`;
    getConnection((connection) => { 
        connection.query(sql, (e, r, f) => {
            if (e) console.log(e);
            res.send(JSON.stringify(r));
            connection.release();            
        });
    });
});

app.use(express.static(build));

app.listen(port, () => {
    console.log(`Server up at ${port}`);
});