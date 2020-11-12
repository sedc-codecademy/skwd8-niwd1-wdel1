#Server image to be used for node
FROM node:12.7-alpine

#Environmnet variables
ENV PORT=8080

#Workdir of application (where to put our project)
WORKDIR /app

#Copy all project files from "this" folder to /app folder on docker image
COPY . /app

#List all files into app folder
RUN ls

#Install all libraries mentioned in package.json
RUN npm install

#Expose port 8080 from docker
EXPOSE ${port}

CMD node index.js
#CMD npm run start