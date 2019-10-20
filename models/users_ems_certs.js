/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users_ems_certs', {
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
        ems_cert_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ems_certs',
                key: 'id'
            }
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
        tableName: 'users_ems_certs',
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true
    });
};
