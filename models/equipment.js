/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('equipment', {
        rpia_control_number: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        brand: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        model: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        serial: {
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
        tableName: 'equipment',
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true
    });
};
