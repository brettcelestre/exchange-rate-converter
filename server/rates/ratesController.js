
let appid = require('../config/config'),
    request = require('request')

module.exports = {
  findRates: function(req, res) {

    console.log('appid = ', appid['appid']);

    console.log('ratesController findRates() - req.body: ', req.body);

    let url = `https://openexchangerates.org/api/convert/${req.body.fromAmount}/${req.body.fromType}/${req.body.toType}?app_id=${req.body.appid}`

    console.log(url);

    request(url, function(error, response, body){
      // Checks for errors
      if (error) {
        console.error('API Error = ', error);
        return false;
      }
      // Parses body into JSON
      var data = JSON.parse(body);
      console.log('API DATA: ', data);

      // Check data status before sending back
      // TODO

      // Sends response
      res.status(200).send(data);
    });
  }
};
