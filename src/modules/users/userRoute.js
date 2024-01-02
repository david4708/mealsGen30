import express from 'express';

import userController from './userController.js';
import {
  protect,
  protectAccountOwner,
  validateExistUser,
} from './userMiddleware.js';
import { validateExistOrder } from '../orders/orderMiddleware.js';
import orderController from '../orders/orderController.js';

export const router = express.Router();

router

  .post('/signUp', userController.signUp)

  .post('/login', userController.login);
//protected routes
router.use(protect);
router.patch('/change-password', userController.changePassword);

router.get('/orders', orderController.findAllOrderSessionUser);

router.get('/orders/:id', validateExistOrder, orderController.findOneOrder);

router
  .route('/:id')

  .patch(validateExistUser, protectAccountOwner, userController.updateUser)
  .delete(validateExistUser, protectAccountOwner, userController.deleteUser);
