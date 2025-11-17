// middlewares/limiter.js
const rateLimit = require('express-rate-limit');
const env = require('../utils/env');

const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many requests. Please try again later.'
  }
});

module.exports = apiLimiter;
