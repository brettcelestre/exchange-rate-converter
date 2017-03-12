let express = require('express'),
    middleware = require('./config/middleware.js'),
    app = express();

// Sets up middleware and routes
middleware(app, express);

let PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log('Listening on', PORT);

module.exports = app;
