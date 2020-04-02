/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('promo_requests', {
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
            },
            unique: 'only_one_promo'
        },
        credential_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'credentials',
                key: 'id'
            },
            unique: 'only_one_promo'
        },
        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        tableName: 'promo_requests',
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true
    });
};
