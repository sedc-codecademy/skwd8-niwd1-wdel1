# base image
FROM node:12.7-alpine

#environment that should be used for ng build
ARG envr 
#port on which nodejs will serve
ARG port
#host/ip on which nodejs will serve
ARG host

ENV PORT=$port
ENV HOST=$host
ENV ENVIRONMENT=$envr
ENV TESTSETUP=dev

#temporary dir for building angular 
WORKDIR /app

COPY ./skwd8-niwd1-wdel1/ /app
COPY ./firebase.js /
COPY ./wd-elective-1-e5b6145ef20d.json /

RUN npm install

RUN ls

EXPOSE ${port}

CMD TESTSETUP=dev ENVIRONMENT=${ENVIRONMENT} node server.js
