# Exchange Rate Converter

A single page app for converting exchange rates based on services provided by [Open Exchange Rates](https://docs.openexchangerates.org/).

## Getting Started

``` bash
# install dependencies
npm install --save
bower install --save

# serve at localhost:8080
npm start

# run all tests
npm test
```

## Tech Stack

* AngularJS
* Node/Express
* Bootstrap
* SASS
* Lodash
* Webpack
* Gulp
* Jasmine
* Karma
* ESLint

## Application Organization

```
client/
  assets/
    css/
    sass/
  app/
    components/
      home/
    shared/
      converter/
    app.module.js
    app.routes.js
  bundle.js
  index.html
server/
  config/
  rates/
  server.js
tests/
  unit/
```

## To Do

* End to end tests
* UX elements (loading spinner, responsive design)
