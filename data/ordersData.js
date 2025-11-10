// data/ordersData.js
// ===== Dummy Data Pesanan (Tanpa Database) =====
// Digunakan untuk simulasi CRUD di RESTful API UTS Web Service Engineering

const orders = [
  {
    id: 1,
    product: 'Pulpen Biru',
    quantity: 10,
    price: 1500
  },
  {
    id: 2,
    product: 'Buku Tulis A5',
    quantity: 5,
    price: 6000
  },
  {
    id: 3,
    product: 'Stapler Mini',
    quantity: 2,
    price: 18000
  },
  {
    id: 4,
    product: 'Kertas HVS A4 (500 lembar)',
    quantity: 1,
    price: 55000
  },
  {
    id: 5,
    product: 'Spidol Permanen Hitam',
    quantity: 4,
    price: 8000
  }
];

module.exports = orders;
