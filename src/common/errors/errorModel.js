import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
//hacer importación de sequelize

const Error = sequelize.define('errors', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  //detail error
  stack: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Error;
