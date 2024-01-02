import express from 'express';
import { protect } from '../users/userMiddleware.js';
import orderController from './orderController.js';
import { validateExistMealByOrder } from '../meals/mealMiddleware.js';
import {
  protectOrderAccountOwner,
  validateExistOrder,
} from './orderMiddleware.js';

export const router = express.Router();

//protected routes
router.use(protect);

router.route('/me').get(orderController.findAllOrders);

//create order if there is a related meal
router.route('/').post(validateExistMealByOrder, orderController.createOrder);

//update an order if it exists in db
router
  .route('/:id')
  .patch(
    validateExistOrder,
    protectOrderAccountOwner,
    orderController.updateOrder
  ),
  //delete an order if it is active in db
  router
    .route('/:id')
    .delete(
      validateExistOrder,
      protectOrderAccountOwner,
      orderController.deleteOrder
    );
