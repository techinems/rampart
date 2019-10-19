/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fuel_log', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    vehicle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    miles: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    fuel: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'fuel_log',
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    freezeTableName: true
  });
};
