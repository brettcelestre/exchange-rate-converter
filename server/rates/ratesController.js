
let request = require('request')

module.exports = {
  findRates: function(req, res) {

    let url = `https://openexchangerates.org/api/latest.json/?app_id=${req.body.appid}`

    request(url, function(error, response, body){
      // Checks for errors
      if (error) {
        console.error('API Error = ', error);
        return false;
      }
      // Parses body into JSON
      let data = JSON.parse(body);

      if ( data.base == 'USD' ) {
        // Stores from rate based off USD at $1
        var fromRate = data.rates[req.body.fromType],
        // Stores to rate based off USD at $1
        toRate = data.rates[req.body.toType],
        // Finds rate
        rate = fromRate / toRate,
        // Finds converted amount
        conversionAmount = (req.body.fromAmount * toRate) / fromRate

        var conversionRate = {
          'rate': rate,
          'convertedAmount': (conversionAmount).toFixed(2),
          'status': 200
        }

        console.log(`Rate        = ${rate}`);
        console.log(`From Amount = ${req.body.fromType} : ${req.body.fromAmount}`);
        console.log(`To Amount   = ${req.body.toType} : ${conversionAmount}`);
        console.log(`================================`)

        // Sends response
        res.status(200).send(conversionRate);

      // If there is an error
    } else if ( data.status == 401 ) {
        res.send(data)
      }

    });
  }
};
