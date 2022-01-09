const Order = require("../models/order");
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandlers");
const asyncErrorHandler = require("../middlewares/catchAsyncErrors");

// Create new order          =>  /api/v1/order/new
exports.newOrder = asyncErrorHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

// Get single order         =>/api/v1/order/:id
exports.getSingleOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order find with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get loggedin uder orders         =>/api/v1/orders/me
exports.myOrders = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });
  const orderCount = order.length;
  if (!order) {
    return next(new ErrorHandler("You hadnot order anything yet", 404));
  }

  res.status(200).json({
    success: true,
    orderCount: orderCount,
    order,
  });
});

// Admin Routes
// Get all orders in database       =>/api/v1/admin/orders
exports.allOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount: totalAmount,
    orders,
  });
});

// Update / Process orders       =>/api/v1/admin/order/:id
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You had already Delivered this order"));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });
  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    success: true,
    order,
  });
});
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete order         =>/api/v1/admin/order/:id
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order find with this id", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});
