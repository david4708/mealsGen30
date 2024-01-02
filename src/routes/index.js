import express from 'express';
import { router as userRouter } from '../modules/users/userRoute.js';
import { router as restaurantRouter } from '../modules/restaurants/restaurantRoute.js';
import { router as mealRouter } from '../modules/meals/mealRoute.js';
import { router as orderRouter } from '../modules/orders/orderRoute.js';
export const router = express.Router();

router.use('/users', userRouter);
router.use('/restaurants', restaurantRouter);
router.use('/meals', mealRouter);
router.use('/orders', orderRouter);
