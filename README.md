# flo-monitor

## features
1. I want an email alert when the spots changed from `in use` to `free`
2. I want to record all status of charge stations, every 5 mins, and save them into the database.
3. I want to have the ability to enable / disable the alert. And when an alert email is sent out, it is disabled until the next time it is enabled.
4. I want to have a UI to interact with the enabling function.
5. I want to have a UI to check heap graph of stations availablility based on time.

## TODO
- [ ] To have a database first. MySQL will be used. Tables are: station(name, id), status_record(station_id, timestamp, status), need_email(bool), emails(email)
- [ ] To have the script to request from FLO website and insert values into db and send email
- [ ] Server to handle enable / disable UI
- [ ] Server to show heat graph

## Process to deploy
- git clone repo
- npm install
- cd fe; npm install; npm run build
- node script/run.js
- node server/server.js