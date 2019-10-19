/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('positions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    officer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'positions',
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    freezeTableName: true
  });
};
