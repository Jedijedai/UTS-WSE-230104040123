// utils/env.js
require('dotenv').config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,

  // Rate limit configs
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || '*',

  // Logging
  logFormat: process.env.LOG_FORMAT || 'combined',
  logFile: process.env.LOG_FILE || 'access.log'
};

module.exports = env;
