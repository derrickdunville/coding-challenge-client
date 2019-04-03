# Ambassador Interview Code Challenge Client
A React Redux front-end built with Material-UI.

http://ambassador.derrickdunville.com

## Track
Full Stack

## Description 
This repository contains an front-end implementation for Ambassador's interview coding challenge.

## Trade-offs
I chose to deploy the application to AWS instead of Heroku. One of the major issues I came across when attempting to deploy to Heroku was that Heroku sets the port that the server is bound to using process.env.PORT, however I was not able to figure out how to get the production server to build with that environment variable. Because this project uses Babel to transpile the ES6 code it is written in, it was suggested to run the build locally and commit the entirely built application to the repository and skip the build process on Heroku and just launch the application using the committed built code. I wasn't about to do that because that would defeat the whole purpose of using webpack to build the code on the production server. And that would not work well in a CI/CD environment. Using AWS also allowed me to demonstrate some of my SysAdmin skills with standing up and configuring servers to host production applications.

If I did have more time I would have added a few more things. I would have configured the servers to use AWS CodeDeploy and CodePipeline to setup CI/CD for the repository. I also would have worked on adding Enzyme to provide test coverage for DOM elements.

## Installing and Running
Once cloned locally, run `npm install` to install the application and its dependencies locally.

### Hot
This project can be run in a hot environment to make working on styling much faster.

`npm run hot`

Will build the client and start webpack-dev-server at http://localhost:8080. This environment is only for the client. There is no server side rendering.

### Dev
The dev environment utilizes nodemon to listen for changes to source code when developing locally. However you still need to waste a few seconds hitting the refresh button to show the updated changes in the browser.

`npm run dev`
Will build the client and server and start the Server.
This environment is for testing server side rendering.
http://localhost:3000

### Production

`npm run build`
Will build the client and server for production.

`npm run production`
Will will start the production server.

## Testing
There is currently a test coverage for Redux actions and reducers.

`npm run test` will run the test suites.

## Delpoyment
This front-end project is deployed to AWS EC2 Ubuntu 14.04 and is using PM2 to manage the running process. It is located at

http://ambassador.derrickdunville.com
