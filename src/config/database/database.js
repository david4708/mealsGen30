//ORM:libreria para conexion servidor/db
//permite interaccion rapida
//const { Sequelize } = require("sequelize");
//const { envs } = require("../envirotment/envirotment");

import { Sequelize } from 'sequelize';
import { envs } from '../environment/environment.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false, //reduce el ruido en la terminal no mostrando las consultas sql
});

export const authenticated = async () => {
  try {
    await sequelize.authenticate();
    console.log('connection has been established successfully.😃'); //authetica el codigo con la db
  } catch (error) {
    console.log(error);
  }
};
export const syncUp = async () => {
  try {
    //el {force:true} se usa para forzar los cambios en la db, teniendo
    //en cuenta q en produccion, es necesario hacer antes una migracion,
    //para no perder los datos
    await sequelize.sync(); //sincroniza el codigo con la db
    console.log('connection has been synced successfully.✌');
  } catch (error) {
    console.log(error);
  }
};
