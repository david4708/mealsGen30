//require("dotenv").config(); //para uso de las variables de entorno(env)
//const env = require("env-var"); //para validar las env
import 'dotenv/config';
import env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  DB_URI: env.get('DB_URI').required().asString(),
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  SECRET_JWT_SEED: env.get('SECRET_JWT_SEED').required().asString(),
  JWT_EXPIRE_IN: env.get('JWT_EXPIRE_IN').required().asString(),
};
