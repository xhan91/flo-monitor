FROM node:8.9.4

ADD package.json /opt
ADD package-lock.json /opt
ADD script/ /opt/script
ADD server/ /opt/server
ADD db/ /opt/db
ADD fe/ /opt/fe
ADD run.sh /opt

RUN cd /opt && npm install
RUN cd /opt/fe && npm install && npm run build

RUN mkdir -p /root/log
RUN chmod +x /opt/run.sh

CMD /opt/run.sh