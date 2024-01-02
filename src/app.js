import express from 'express';

import { router } from './routes/index.js';
import { envs } from './config/environment/environment.js';
import morgan from 'morgan';
import { AppError } from './common/errors/appError.js';
import { globalErrorHandler } from './common/errors/errorController.js';
import { enableCors } from './config/plugins/corsPlugin.js';

//2. crearnos una constante app que tendra
//todas las funcionalidades de express

//routes

const app = express();
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',

  'http://localhost:5173',
  'http://localhost:3002',
  'https://monumental-stardust-f3477f.netlify.app',
];

//middlewares para leer json y url-encode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS);

if (envs.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//rutas

app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`can't find ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
