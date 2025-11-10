// controllers/ordersController.js
let orders = require('../data/ordersData');

const getNextId = () => (orders.length ? Math.max(...orders.map(o => Number(o.id))) + 1 : 1);

function validateOrder(payload) {
  const errs = [];
  const { product, quantity, price } = payload;

  if (typeof product !== 'string' || product.trim().length === 0) {
    errs.push("Field 'product' wajib diisi (string).");
  }
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
    errs.push("Field 'quantity' wajib berupa integer > 0.");
  }
  if (typeof price !== 'number' || Number.isNaN(price) || price < 0) {
    errs.push("Field 'price' wajib berupa number >= 0.");
  }
  return { valid: errs.length === 0, message: errs.join(' ') };
}

exports.getAllOrders = (req, res) => {
  res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
};

exports.getOrderById = (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => Number(o.id) === id);
  if (!order) return res.status(404).json({ status: 'fail', message: `Order dengan id ${id} tidak ditemukan` });
  res.status(200).json({ status: 'success', data: { order } });
};

exports.createOrder = (req, res) => {
  const { valid, message } = validateOrder(req.body);
  if (!valid) return res.status(400).json({ status: 'fail', message });

  const { product, quantity, price } = req.body;
  const newOrder = { id: getNextId(), product: product.trim(), quantity, price };
  orders.push(newOrder);
  res.status(201).json({ status: 'success', data: { order: newOrder } });
};

exports.updateOrder = (req, res) => {
  const id = Number(req.params.id);
  const idx = orders.findIndex(o => Number(o.id) === id);
  if (idx === -1) return res.status(404).json({ status: 'fail', message: `Order dengan id ${id} tidak ditemukan` });

  const { valid, message } = validateOrder(req.body);
  if (!valid) return res.status(400).json({ status: 'fail', message });

  const { product, quantity, price } = req.body;
  const updated = { ...orders[idx], product: product.trim(), quantity, price };
  orders[idx] = updated;
  res.status(200).json({ status: 'success', data: { order: updated } });
};

exports.deleteOrder = (req, res) => {
  const id = Number(req.params.id);
  const idx = orders.findIndex(o => Number(o.id) === id);
  if (idx === -1) return res.status(404).json({ status: 'fail', message: `Order dengan id ${id} tidak ditemukan` });
  orders.splice(idx, 1);
  res.status(204).send();
};
