
let ratesController = require('./ratesController.js');

module.exports = function(app) {

  app.route('/')
    .post(ratesController.findRates)

};
