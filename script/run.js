const flo = require('./flo');
const getConnection = require('../db/connection').getConnection;

function extractFloData(floData) {
    const id = floData.Id;
    const name = floData.Name;
    // floData.Status: 1 - available; 2 - in use;
    const status = floData.Status !== 2;
    if (status) {
        console.log("NOTICE: CHARGING IS AVAILABLE NOW");
    }

    // check if the status changed, and if it is, update the timestamp of last_status_changed;
    const checkSql = `SELECT status FROM station WHERE id = '${id}'`;
    const updateSql = `UPDATE station SET last_status_changed = NOW() WHERE id = '${id}'`;
    getConnection((connection) => {
        connection.query(checkSql, (e, r, f) => {
            if (e) console.log(e);
            const dbStatus = r[0].status;
            if (dbStatus != status) {
                console.log("update last status changed");
                connection.query(updateSql, (e, r, f) => {
                    if (e) console.log(e);
                    connection.release();
                });
            } else {
                connection.release();
            }
        });
    });

    const sql = `INSERT INTO station VALUES ('${id}', '${name}', ${status}, NOW(), NOW()) ON DUPLICATE KEY UPDATE status=${status}, last_updated=NOW()`;    
    getConnection((connection) => {
        connection.query(sql, (e, r, f) => {
            if (e) console.log(e);
            connection.release();
        });
    });
}

const doIt = () => {
    flo.getStatus().then(JSON.parse).then((data) => {
        //timestamp
        const time = new Date();
        console.log(`------ ${time.getHours()}:${time.getMinutes()} ------`)
        data.forEach(extractFloData);
    });
}

const wrap = () => {
    doIt();
    setTimeout(wrap, 60 * 1000);
}

wrap();