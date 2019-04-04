# Ambassador Interview Code Challenge Client
A React Redux front-end built with Material-UI. Tested with Jest.

http://ambassador.derrickdunville.com

This repository contains a front-end implementation for Ambassador's interview coding challenge. The accompanying backend repository can be found here

https://github.com/derrickdunville/coding-challenge

## Track
Full Stack

## Problem Description
The year is 1991, and Tim Berners-Lee has just invented the World Wide Web. As his best friend, he turns to you for help growing this crazy new thing. You decide referral marketing is the most effective way to grow support for Tim’s invention and plan to bring word of mouth to the web in the form of a simple, automated referral system.

The system you’ve dreamt up is very straightforward. It only needs two pages to satisfy Tim’s needs: one to create, edit, delete, and track referral links and another to serve as a landing page for the links that promotes the World Wide Web.

### Functional spec
The link page is where Tim will manage his referral links. This page should be located at the root of your domain i.e. {your_url}. There should be a form to add links. It only needs one field, which is the unique title of the link e.g. spartans or wolverines. This title will form the referral url e.g. {your_url}/spartans or {your_url}/wolverines. Below this form should be a list of the active referral links with options to edit or delete links. The # of times a link has been clicked should be tracked and displayed next to each link in the list. The link title should link to the Landing Page.

![Link Page](https://lh4.googleusercontent.com/E03q_HNyAyBCgyuiLN_UMkqmygSH4k1n2sZAG5p4EyothDtwXIh81nuXF0--JUsJs3PQaJJV_oIKvVqIPlNSU96Q4zT3N1f6E6Pl0XJk7wdqruNi69RlV7yUd_FhztzJEbZUkA)

The landing page is where each referral link should redirect. This page should be located at its own unique url i.e. {your_url}/landing. The content of this page is not important, though you should feel free to use it as a canvas to promote and express your feelings toward the World Wide Web for Tim. When each referral link redirects to the landing page, the link title must be appended as a query parameter in the url e.g. {your_url}/landing/?link={link_title}. The link title should be grabbed from the query parameter and displayed somewhere on the landing page, which is the only content you actually have to include.

![Landing Page](https://lh3.googleusercontent.com/HFEsNHwWaII66dB_Pa5nm8WZgPOp3F-jSyMxwFAwyO04O7dFlHovFW9hKovR6IbL6eaxCxKlq4iK30r2lVM8-ykjnllC0Ga85MtEenmZ52DnhR3ZhiGRFV_mY44HZClXD8TGIw)

#### Back-end
Your task is to build a REST API that can support the functionality described for the Link and Landing pages in the functional spec. Your API should be able to:

-	Perform CRUD actions for Link pages
-	Track the number of visits to the Landing Page

I opted to use NodeJS to build this backend REST API because I have been working with javascript for a little over a year and a half and that is currently the language I'm most comfortable working with.

#### Front-end
The accompanying Front-end implementation can be found here.

https://github.com/derrickdunville/coding-challenge-client

It is also build using NodeJS. It uses Express, React, Redux, and Material-UI. There are also a number of other npm packages that were used to support additional functionality.

In addition to building the referral application, complete the HTML/CSS challenge which can be found in the `/html-css-exercise` [folder in the repo](https://github.com/GetAmbassador/coding-challenge/tree/master/html-css-exercise).

The html-css-exercise is actually a part of the back-end repository since it was easier for me to serve it as a static html page from the backend server.

http://api.ambassador.derrickdunville.com/html-css-exercise


## Trade-offs
I chose to deploy the application to AWS instead of Heroku. One of the major issues I came across when attempting to deploy to Heroku was that Heroku sets the port that the server is bound to using process.env.PORT, however I was not able to figure out how to get the production server to build with that environment variable. Because this project uses Babel to transpile the ES6 code it is written in, it was suggested to run the build locally and commit the entirely built application to the repository and skip the build process on Heroku and just launch the application using the committed built code. I wasn't about to do that because that would defeat the whole purpose of using Webpack to build the code on the production server. And that would not work well in a CI/CD environment. Using AWS also allowed me to demonstrate some of my SysAdmin skills with standing up and configuring servers to host production applications. Also the page load time is pretty mediocre on Heroku. Ain't nobody got time for that.

If I did have more time I would have added a few more things. I would have configured the servers to use AWS CodeDeploy and CodePipeline to setup CI/CD for the repository. I also would have worked on adding Enzyme to provide test coverage for DOM elements. Another good addition would have been to add Socket.io or websockets so the changes to the links could be seen in real-time across different sessions. 

## Installing and Running
Once cloned locally, run

`npm install` to install the application and its dependencies locally.

### Hot
This project can be run in a hot environment to make working on styling much faster.

`npm run hot` Will build the client and start webpack-dev-server at http://localhost:8080. This environment is only for the client. There is no server side rendering.

### Dev
The dev environment utilizes nodemon to listen for changes to source code when developing locally. However you still need to waste a few seconds hitting the refresh button to show the updated changes in the browser.

`npm run dev` Will build the client and server and start the Server. This environment is for testing server side rendering.
http://localhost:3000

### Production

`npm run build`
Will build the client and server for production.

`npm run production`
Will will start the production server.

`sudo pm2 start build/bundle.js`
Will start and keep the application process running.

## Testing
There is currently test coverage for Redux actions and reducers.

`npm run test` will run the test suites.

## Delpoyment
This front-end project currently deployed to AWS. It's running on a Ubuntu 14.04 EC2 Instance with an NGINX web server. PM2 is managing the running process. It can be found here

http://ambassador.derrickdunville.com

## Other projects!

### Material-UI
https://github.com/derrickdunville/material-ui

I have been working on this project for a few months now.  It was forked from material-dashboard-react by creativetimofficial.

https://github.com/creativetimofficial/material-dashboard-react

All work on this repository since I forked it has been done by me. My goal with this project is to push a React Front-End for a company I co-founded called Ascend Trading. It will be replacing our current Wordpress website and will utilize Stripe, SendGrid and Twilio.

## About the Author
http://derrickdunville.com
