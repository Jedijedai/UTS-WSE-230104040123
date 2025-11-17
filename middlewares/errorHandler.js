// middlewares/errorHandler.js

// 404 - Not Found handler
const notFound = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} tidak ditemukan`,
  });
};

// Global Error Handler
// Pastikan ini dipasang paling terakhir di app.js
const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    message:
      err.message || 'Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.',
    // opsional: kirim stack hanya di development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  notFound,
  errorHandler,
};
