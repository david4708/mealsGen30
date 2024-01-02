//import { catchAsync } from '../../common/errors/catchAsync.js';
//import { validateOrder } from './orderSchema.js';
//import { OrderService } from './orderService.js';

import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateOrder } from './orderSchema.js';
import { OrderService } from './orderService.js';

const findAllOrderSessionUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await OrderService.findAllOrderSessionUser(sessionUser.id);
  if (!orders) {
    return next(
      new AppError(
        `sessionUser with id:${sessionUser.id} has not active orders`,
        404
      )
    );
  }
  return res.status(201).json(orders);
});
const findOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await OrderService.findOneOrder(id);

  return res.status(201).json(order);
});

const findAllOrders = catchAsync(async (req, res, next) => {
  const orders = await OrderService.findAllOrders();

  return res.status(201).json(orders);
});

const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser, meal } = req;
  const { hasError, errorMessages, orderData } = validateOrder(req.body);

  const NewtotalPrice = orderData.quantity * meal.price;
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const order = await OrderService.createOrder({
    userId: sessionUser.id,
    quantity: orderData.quantity,
    mealId: orderData.mealId,
    totalPrice: NewtotalPrice,
  });
  return res.status(201).json(order);
});
const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const orderUpdated = await OrderService.updateOrder(order);

  return res.status(201).json(orderUpdated);
});
const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const orderDeleted = await OrderService.deleteOrder(order);

  return res.status(201).json(orderDeleted);
});
export default {
  findAllOrderSessionUser,
  findAllOrders,
  findOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
