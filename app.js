// app.js
const express = require('express');
const morgan = require('morgan');
const ordersRouter = require('./routes/ordersRoutes');

const app = express();

// ====== Middleware dasar ======
app.use(express.json());              // semua request/response pakai JSON
app.use(morgan('dev'));               // logging sederhana (opsional)

// ====== Discoverability (/api/info) ======
app.get('/api/info', (req, res) => {
  res.status(200).json({
    app: 'UTS Web Service Engineering',
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
      'Discoverability'
    ],
    version: '1.0.0',
    time: new Date().toISOString()
  });
});

// ====== Resource-Oriented URI ======
app.use('/api/orders', ordersRouter);

// ====== 404 untuk endpoint yang tidak dikenal ======
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`
  });
});

// ====== Error handler konsisten (JSON-only) ======
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    message: err.message || 'Terjadi kesalahan pada server'
  });
});

// ====== Jalankan server pada port 3000 (default) ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app; // memudahkan testing bila diperlukan
