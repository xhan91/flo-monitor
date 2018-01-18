const flo = require('./flo');
const getConnection = require('../db/connection').getConnection;

function extractFloData(floData) {
    // console.log(floData);
    const id = floData.Id;
    const name = floData.Name;
    const status = floData.Status;
    const sql = `INSERT INTO station VALUES ('${id}', '${name}', ${status !== 2}, NOW()) ON DUPLICATE KEY UPDATE status=${status !== 2}, last_updated=NOW()`;
    if (status !== 2) {
        console.log("NOTICE: CHARGING IS AVAILABLE NOW");
    }
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