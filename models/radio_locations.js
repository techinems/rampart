/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('radio_locations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    equipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipment',
        key: 'id'
      }
    },
    radio_coordinator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    location: {
      type: DataTypes.TEXT,
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
    tableName: 'radio_locations',
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    freezeTableName: true
  });
};
