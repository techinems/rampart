/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },        
        nine_hundred: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        home_street: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        home_city: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        home_state: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        home_zip: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        local_street: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        local_city: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        local_state: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        local_zip: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rcs_id: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        rin: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        access_revoked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        g_id: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        slack_id: {
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
        tableName: 'users',
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true
    });
};
