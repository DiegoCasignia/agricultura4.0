const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Cosecha = sequelize.define('Cosecha', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  agricultor_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'agricultores',
      key: 'id',
    },
  },
  producto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  toneladas: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'REGISTRADA',
    validate: {
      isIn: [['REGISTRADA', 'PROCESADA', 'FACTURADA', 'PAGADA']],
    },
  },
  ubicacion: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'cosechas',
  timestamps: true,
});

module.exports = Cosecha;