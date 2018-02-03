#!/bin/sh

# logs are at /root/log
nohup node /opt/script/run.js >> /root/log/script.log 2>&1 &
nohup node /opt/server/server.js >> /root/log/server.log 2>&1 &

while true
do
    sleep 3600
done