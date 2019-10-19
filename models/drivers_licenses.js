/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('drivers_licenses', {
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
    number: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiration: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    scan_filepath: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'drivers_licenses',
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    freezeTableName: true
  });
};
