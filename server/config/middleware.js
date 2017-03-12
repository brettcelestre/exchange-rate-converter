let morgan = require('morgan'),
    bodyParser = require('body-parser')

module.exports = function (app, express) {

  // Use express router mini-app
  let ratesRouter = express.Router()

  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({extended: true}))
  // Parse JSON
  app.use(bodyParser.json())
  // Serves index
  app.use(express.static(__dirname + '/../../client'))

  app.use('/rates', ratesRouter)

  require('../rates/ratesRoutes.js')(ratesRouter)
};
