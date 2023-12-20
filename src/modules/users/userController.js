//import userService from './userService.js';

import { catchAsync } from '../../common/errors/catchAsync.js';

const signUp = catchAsync(async (req, res, next) => {});
const login = catchAsync(async (req, res, next) => {});
const getAllUser = catchAsync(async (req, res, next) => {});
const getOneUser = catchAsync(async (req, res, next) => {});
const updateUser = catchAsync(async (req, res, next) => {});
const deleteUser = catchAsync(async (req, res, next) => {});

export default {
  signUp,
  login,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
};
