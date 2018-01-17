const flo = require('./flo');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'josh',
    database: 'flo'
});
connection.connect();        


function extractFloData(floData) {
    // console.log(floData);
    const id = floData.Id;
    const name = floData.Name;
    const status = floData.Status;
    const sql = `INSERT INTO station VALUES ('${id}', '${name}', ${status !== 2}, NOW()) ON DUPLICATE KEY UPDATE status=${status !== 2}, last_updated=NOW()`;
    if (status !== 2) {
        console.log("NOTICE: CHARGING IS AVAILABLE NOW");
    }
    connection.query(sql, (e, r, f) => {
        if (e) console.log(e);
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