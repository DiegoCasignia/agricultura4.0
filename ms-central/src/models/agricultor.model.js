const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Agricultor = sequelize.define('Agricultor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  telefono: {
    type: DataTypes.STRING,
    validate: {
      is: /^[0-9]{10,15}$/,
    },
  },
  direccion: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'agricultores',
  timestamps: true,
});

module.exports = Agricultor;