/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('credentials', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(credentials_id_seq::regclass)',
      unique: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    abbr: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    major_cred: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    parent_cred: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'credentials',
        key: 'id'
      }
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
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    tableName: 'credentials'
  });
};
