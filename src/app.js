import express from 'express';
import { router } from './routes/index.js';
import { envs } from './config/environment/environment.js';
import morgan from 'morgan';
import { AppError } from './common/errors/appError.js';
import { globalErrorHandler } from './common/errors/errorController.js';
import { enableCors } from './config/plugins/corsPlugin.js';
import { limitRequest } from './config/plugins/rate-limit.plugin.js';
import helmet from 'helmet';
import hpp from 'hpp';
import sanitizer from 'perfect-express-sanitizer';
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
//limit requests by IP, in a certain time
const rateLimit = limitRequest(
  1000,
  60,
  'Too many request from this IP, please try again in an hour!'
);
//middlewares para leer json y url-encode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//limit requests by IP, in a certain time
app.use(rateLimit);

//provides security headers
app.use(helmet());

//protect against http parameter pollution attacks
app.use(
  hpp({
    //whitelist: [''] //firstname
  })
);

//control user input data to prevent cross-site scripting(xss),
//SQL injection, and NoSQL injection attacks, it can sanitize the body,
// and header of request to remove any potentially harmful data.
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false, //dejar esto en false, para que no se bloque el form/data
  })
);
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
