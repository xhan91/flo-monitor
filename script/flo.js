const request = require('request');
const fs = require('fs');

let json = fs.readFileSync('info.json');
json = JSON.parse(json);

headers = {
    'Host': 'flo.ca',
    'Connection': 'keep-alive',
    'Content-Length': 243,
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Accept': '*/*',
    'Origin': 'https://flo.ca',
    'X-requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Referer': 'https://flo.ca/on-the-go/map',
    // 'Accept-Encoding': 'gzip, deflate, br',
    // 'Accept-Language': 'en',
    'Cookie': 'language=en-US; ARRAffinity=89cdfe8616ce49320589ea1857a09f62b92ea834ef951aff46397112edfe103e; _ga=GA1.2.1267337079.1515715766; _gid=GA1.2.1359092757.1515715766; __hssrc=1; hubspotutk=a26136308ec65dca69782a4e99b07699; _nutm_r=https%3A%2F%2Fwww.google.ca%2F; _nutm_is=%7B%22session_start%22%3A1515715767436%2C%22recorded_time%22%3A0%2C%22active_iams%22%3A%5B%5D%2C%22time_on_site%22%3A%7B%7D%2C%22invalid_iams%22%3A%5B%5D%7D; nuGoClientId=GA1.2.1267337079.1515715766; __RequestVerificationToken=9NIsb2CyTEfv-rwvofmgsoDi0f_qvSlPMAyy5l56D9guPADBfY7kusFHXo2Tmb3L6ebdAGJG8uPjD5CrfVQEAdC7TSXIGznzCcL-kUUjEOQ1; 1515715767215192332=%7B%22welcome_recommendation%22%3A%7B%22id%22%3A0%2C%22name%22%3A%22no_show%22%7D%2C%22email_collection%22%3A%7B%22id%22%3A1%2C%22name%22%3A%22email_collection_banner%22%7D%7D; _nutm_a=0; ASP.NET_SessionId=swshvdfcclm3tytas0t1lvbd; _gat_UA-72278120-3=1; __hstc=69071886.a26136308ec65dca69782a4e99b07699.1515715766874.1515715766874.1515777214736.2; _nutm_s=2.1515715767.1515777215.1515715767215192332; _nutm_sc=1515777215084170152; __hssc=69071886.3.1515777214736'
}

// TODO: too many magic words here, fix it in the future.
body = json.station_ids.map(a => 'stationIds%5B%5D=' + a).concat(['__RequestVerificationToken=' + json.__RequestVerificationToken]).join('&')

var options = {
    method: 'POST',
    url: 'https://flo.ca/network/stations',
    headers: headers,
    body: body
}

module.exports.getStatus = () => {
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) console.log(err);
            resolve(body);
        });
    });
}