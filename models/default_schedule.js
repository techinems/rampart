/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('default_schedule', {
        day: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        cc: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        driver: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        att1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        att2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
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
        tableName: 'default_schedule',
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true
    });
};
