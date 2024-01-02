//import userService from './userService.js';

import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import {
  encryptedPassword,
  verifyPassword,
} from '../../config/plugins/encriptedPasswordPlugin.js';
import { generateJWT } from '../../config/plugins/generatedJWTplugin.js';
import { OrderService } from '../orders/orderService.js';
import {
  validateLogin,
  validatePartialUser,
  validateUser,
} from './userSchema.js';
import UserServices from './userService.js';

const signUp = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await UserServices.signUp(userData);

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    status: 'success',
    user,
  });
});
const login = catchAsync(async (req, res, next) => {
  //1. traer los datos de la req.body y validarlos
  const { hasError, errorMessages, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  //2. validar q el usuario exista en la base de datos
  const user = await UserServices.findOneByEmail(userData.email);
  if (!user) {
    return next(new AppError('this account does not exist', 404));
  }

  //3. comparar y comprobar contraseñas
  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('incorrect email o password', 401));
  }
  //4. generar el jwt
  const token = await generateJWT(user.id);

  //5. enviar la respuesta al cliente
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const findOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await UserServices.findOneOrder(id);

  return res.status(200).json(order);
});
const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hasError, errorMessages, userData } = validatePartialUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const userUpdated = await UserServices.update(user, userData);
  return res.status(201).json(userUpdated);
});
const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const deletedUser = await UserServices.delete(user);
  return res.status(201).json(deletedUser);
});

const changePassword = catchAsync(async (req, res, next) => {
  //1. obtener el usuario en session
  const { sessionUser } = req;

  //2. traer los datos de la req.body
  const { currentPassword, newPassword } = req.body;

  //3. validar si la contraseña actual y la nueva son iguales, enviar un error;
  if (currentPassword === newPassword) {
    return next(new AppError('The password cannot be equal', 400));
  }

  //4. validar si la contraseña actual es igual a la contraseña en base de datos
  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //5. encriptar la nueva contraseña
  const hashedNewPassword = await encryptedPassword(newPassword);

  //6 actualizar la contraseña
  await UserServices.update(sessionUser, {
    password: hashedNewPassword,
    passwordChangedAt: new Date(),
  });

  return res.status(200).json({
    message: 'The user password was updated successfully!',
  });
});

export default {
  signUp,
  login,

  findOneOrder,
  updateUser,
  deleteUser,
  changePassword,
};
