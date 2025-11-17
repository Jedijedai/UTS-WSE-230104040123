// app.js
require('dotenv').config(); // baca .env paling awal

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const ordersRoutes = require('./routes/ordersRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// ====== Konfigurasi dari .env ======
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const LOG_FORMAT = process.env.LOG_FORMAT || 'dev';
const LOG_FILE_PATH = process.env.LOG_FILE_PATH || 'logs/access.log';

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const RATE_LIMIT_WINDOW_MINUTES = parseInt(
  process.env.RATE_LIMIT_WINDOW_MINUTES || '15',
  10
);
const RATE_LIMIT_MAX_REQUESTS = parseInt(
  process.env.RATE_LIMIT_MAX_REQUESTS || '100',
  10
);

// ====== Middleware global ======

// Parsing JSON
app.use(express.json());

// Security headers pakai Helmet
app.use(helmet());

// CORS – hanya izinkan origin tertentu
const corsOptions = {
  origin: (origin, callback) => {
    // Untuk Postman / server-side request tanpa origin
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} tidak diizinkan oleh CORS`));
    }
  },
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MINUTES * 60 * 1000, // X menit
  max: RATE_LIMIT_MAX_REQUESTS, // max request per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Terlalu banyak request dari IP ini, coba lagi nanti.',
  },
});
app.use(limiter);

// Logging dengan morgan ke console + file
// Pastikan folder logs ada
const logsDir = path.dirname(LOG_FILE_PATH);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}
const accessLogStream = fs.createWriteStream(path.join(LOG_FILE_PATH), {
  flags: 'a',
});

// Logging ke console
app.use(morgan(LOG_FORMAT));

// Logging ke file
app.use(morgan('combined', { stream: accessLogStream }));

// ====== Simple request counter untuk metrics ======
let requestCount = 0;
app.use((req, res, next) => {
  requestCount += 1;
  next();
});

// ====== Endpoint dasar ======

app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di API Orders - Praktikum 7 Hardening',
  });
});

// Endpoint /api/info (dari UTS, tetap dipakai)
app.get('/api/info', (req, res) => {
  res.status(200).json({
    app: 'UTS + Praktikum 7 Web Service Engineering',
    author: 'Husni Majedi',
    nim: '230104040123',
    resource: 'orders',
    principles: [
      'Resource-Oriented URI',
      'Proper HTTP Methods',
      'Stateless Communication',
      'Consistent Status Codes',
      'JSON Representation',
      'Validation & Error Handling',
      'Discoverability',
      'Security (Helmet, CORS, Rate Limit)',
      'Observability (Logging, Health, Metrics)',
    ],
    env: NODE_ENV,
    version: '2.0.0',
    time: new Date().toISOString(),
  });
});

// ====== Monitoring & Health Endpoint ======

// /api/health → untuk cek apakah service hidup
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Service is healthy',
    uptime: process.uptime(), // dalam detik
    timestamp: new Date().toISOString(),
  });
});

// /api/metrics → info basic monitoring
app.get('/api/metrics', (req, res) => {
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    requests: requestCount,
    memory: {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external,
    },
  });
});

// ====== Endpoint testing untuk error 500 ======
app.get('/api/error', (req, res, next) => {
  const err = new Error('Simulasi internal server error');
  err.statusCode = 500;
  next(err);
});

// ====== Routes utama (resource orders) ======
app.use('/api/orders', ordersRoutes);

// ====== 404 & Error Handler (paling bawah) ======
app.use(notFound);
app.use(errorHandler);

// ====== Start server ======
app.listen(PORT, () => {
  console.log(
    `Server berjalan di port ${PORT} | mode=${NODE_ENV} | Praktikum 7 Hardening`
  );
});
