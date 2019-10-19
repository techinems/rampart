/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audit_log', {
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
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.CIDR,
      allowNull: false
    },
    table_modified: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'audit_log',
    timestamps: true,
    createdAt: 'timestamp',
    updatedAt: false,
    freezeTableName: true
  });
};
