const env = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const connectRoutes = require('./routes/index');
const connectPassport = require('./utils/passport');
const loadConfiguration = require('./utils/config');
const db = require('./utils/db');

// Configure application
env.config();
const config = loadConfiguration();
const app = express();

connectPassport(passport, config);
db.initialize(config);

// Middleware
app.use(cors());
app.options('*', cors());
app.use(passport.initialize());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(logger('dev'));

// Routes
connectRoutes(app);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.json({
    message: err.message
  });
});

// Open
app.listen(config.port, () => {
  console.log(`Listening on ${config.port}`);
});
