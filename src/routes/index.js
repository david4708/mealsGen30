import express from 'express';
import { router as userRouter } from '../modules/users/userRoute.js';

export const router = express.Router();

router.use('/users', userRouter);
