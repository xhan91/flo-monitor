const mysql = require('mysql');

const config = {
    host: '127.0.0.1',
    user: 'xhan91',
    database: 'flo',
    connectionLimit: 10
};

let pool;

// resolve is a function that accepts an connected connection object, and should call connection.release() at the end.
const getConnection = () => {
    return new Promise((resolve, reject) => {
        if (!pool) {
            pool = mysql.createPool(config);
        }
        pool.getConnection((err, connection) => {
            if (err) console.log(err);
            resolve(connection);
        });
    });
}

module.exports.getConnection = getConnection;
