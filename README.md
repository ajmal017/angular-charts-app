# Chart the Stock Market

## Overview

This app allows users to generate a chart of company daily closing values by selecting any number of companies and a date range.
Using web sockets, the app propagates changes across all clients in real-time. The client leverages Angular v2.x and Typescript 
backed by a Node.js server, proxy and API.

A demo version of this app is deployed at: [https://angular-charts.herokuapp.com/](https://angular-charts.herokuapp.com/)

![](client/assets/img/app-screenshot.png?raw=true)

Part of the [FreeCodeCamp](https://www.freecodecamp.com/cjsheets) curriculum based on the following user stories:

* I can view a graph displaying the recent trend lines for each added stock.
* I can add new stocks by their symbol name.
* I can remove stocks.
* I can see changes in real-time when any other user adds or removes a stock. For this you will need to use Web Sockets.

## Install

Clone this repository and install npm dependencies:

```
git clone git@github.com:cjsheets/angular-charts-app.git
cd angular-charts-app
npm install
```

## Run

First, start the Node.js server in development mode:

```
npm run express-dev
```

For client development, use angular-cli to launch the app:

```
ng serve
```

Navigate to `http://localhost:4200`

For server development, build the client to `/dist`:

```
ng build
```

Navigate to `http://localhost:5000`

## Technology Stack

This package contains:

| Front-End | Back-End |
| ------- | ------- |
| Angular v2.x | Node.js |
| RxJS | Express |
| D3.js | Socket.io |
| HTML5/CSS |  |
| Webpack | |

| Both | 
| ------- |
| Typescript |
| Karma/Protractor | 

### Testing

* *Work in progress*

#### unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### To-Do:

* Add timeout function to undo changes that fail (either due to bug or API)
* Improve error handling when API request fails
* Improve response when multiple requests made before graph renders

### License

MIT License

[![Analytics](https://cjs-beacon.appspot.com/UA-10006093-3/github/cjsheets/angular-charts-app?pixel)](https://github.com/cjsheets/angular-charts-app)

