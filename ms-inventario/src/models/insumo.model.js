const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Insumo = sequelize.define('Insumo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre_insumo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  stock: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  unidad_medida: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'kg',
  },
  stock_minimo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 10,
  },
}, {
  tableName: 'insumos',
  timestamps: true,
  version: true, // Para bloqueo optimista
});

module.exports = Insumo;