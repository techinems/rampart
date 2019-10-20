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
        rpia_control_number: {
            type: DataTypes.TEXT,
            allowNull: false,
            references: {
                model: 'equipment',
                key: 'rpia_control_number'
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
