const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'josh',
    database: 'flo',
    connectionLimit: 10
};
let pool;

// useConnection is a function that accepts an connected connection object, and should call connection.release() in the callback.
const getConnection = (useConnection) => {
    if (!pool) {
        pool = mysql.createPool(config);
    }
    // console.log(pool);
    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        useConnection(connection);
    });
}

module.exports.getConnection = getConnection;
