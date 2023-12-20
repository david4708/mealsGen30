import express from 'express';

import userController from './userController.js';

export const router = express.Router();

router

  .post('/signUp', userController.signUp)

  .post('/login', userController.login)

  .get('/', userController.getAllUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
