// middlewares/logger.js
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const env = require('../utils/env');

// buat stream ke file log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', env.logFile),
  { flags: 'a' }
);

// log ke file
const logger = morgan(env.logFormat, {
  stream: accessLogStream,
});

// log ke console (development)
const loggerConsole = morgan('dev');

module.exports = {
  logger,
  loggerConsole
};
