// controllers/ordersController.js

// Import data dummy orders
// Pastikan ../data/ordersData.js men-export array orders, contoh:
// module.exports = [
//   { id: 1, product: 'Laptop', quantity: 2, price: 15000000 },
//   ...
// ];
let orders = require('../data/ordersData');

// Helper untuk generate id baru
const getNextId = () => {
  if (!orders || orders.length === 0) return 1;
  const maxId = Math.max(...orders.map((o) => o.id));
  return maxId + 1;
};

// Validasi payload order
const validateOrder = (payload) => {
  const { product, quantity, price } = payload;
  const errs = [];

  if (typeof product !== 'string' || product.trim().length === 0) {
    errs.push("Field 'product' wajib diisi (string).");
  }

  if (
    typeof quantity !== 'number' ||
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    errs.push("Field 'quantity' wajib berupa integer > 0.");
  }

  if (typeof price !== 'number' || Number.isNaN(price) || price < 0) {
    errs.push("Field 'price' wajib berupa number >= 0.");
  }

  if (errs.length > 0) {
    return {
      valid: false,
      message: errs.join(' '),
    };
  }

  return { valid: true, message: 'OK' };
};

// GET /api/orders
const getAllOrders = (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:id
const getOrderById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: "Parameter 'id' harus berupa angka.",
      });
    }

    const order = orders.find((o) => o.id === id);

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: `Order dengan id ${id} tidak ditemukan.`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/orders
const createOrder = (req, res, next) => {
  try {
    const { valid, message } = validateOrder(req.body);

    if (!valid) {
      return res.status(400).json({
        status: 'fail',
        message,
      });
    }

    const { product, quantity, price } = req.body;

    const newOrder = {
      id: getNextId(),
      product,
      quantity,
      price,
    };

    orders.push(newOrder);

    res.status(201).json({
      status: 'success',
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/orders/:id
const updateOrder = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: "Parameter 'id' harus berupa angka.",
      });
    }

    const index = orders.findIndex((o) => o.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: 'fail',
        message: `Order dengan id ${id} tidak ditemukan.`,
      });
    }

    const { valid, message } = validateOrder(req.body);

    if (!valid) {
      return res.status(400).json({
        status: 'fail',
        message,
      });
    }

    const { product, quantity, price } = req.body;

    const updatedOrder = {
      id,
      product,
      quantity,
      price,
    };

    orders[index] = updatedOrder;

    res.status(200).json({
      status: 'success',
      data: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/orders/:id
const deleteOrder = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: "Parameter 'id' harus berupa angka.",
      });
    }

    const index = orders.findIndex((o) => o.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: 'fail',
        message: `Order dengan id ${id} tidak ditemukan.`,
      });
    }

    orders.splice(index, 1);

    // 204 No Content → tanpa body
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  validateOrder,
};
