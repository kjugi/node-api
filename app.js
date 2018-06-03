require('./config/config'); // Main config
require('./global_functions'); // Necessary functions

const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      logger     = require('morgan'),
      passport   = require('passport'),
      v1         = require('./routes/v1'),
      models     = require('./models');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use Passport
app.use(passport.initialize());

// Load models and connect DB
models.sequelize.authenticate().then(() => {
  console.log('Connected to MySQL');
})
  .catch((error) => {
    console.log('Unable to connect MySQL', error);
  });

if (CONFIG.app === 'development') {
  models.sequelize.sync(); // create tables fom models
  //models.sequelize.sync({ force: true }); -> for tests
}

// Website can make request
app.use((request, response, next) => {
  // Allow website to connect
  response.setHeader('Access-Control-Allow-Origin', '*');

  // Add methods allowed in website
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');

  // Add headers allowed in website
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');

  // To include cookie on website if needed i.e. in session case
  response.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Routes
app.use('/v1', v1);

app.use('/', (request, response) => {
  response.statusCode = 200;
  response.json({
    status: 'success',
    message: 'Parcel Pending API',
    data: {}
  });
});

// If error
app.use((request, response, next) => {
  const error = new Error('Not Found');

  error.status = 404;
  next(error);
});

// Send to error handler
app.use((error, request, response, next) => {
  // Set locals, Provide error
  response.locals.message = error.message;
  response.locals.error = (request.app.get('env') === 'development') ? error : {};

  // Render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
