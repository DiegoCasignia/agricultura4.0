const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Factura = sequelize.define('Factura', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cosecha_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  pagado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  fecha_emision: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fecha_pago: {
    type: DataTypes.DATE,
  },
  metodo_pago: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'facturas',
  timestamps: true,
});

module.exports = Factura;