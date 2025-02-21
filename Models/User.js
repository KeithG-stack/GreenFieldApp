import { Sequelize, DataTypes } from 'sequelize';
import { neon } from '../Config/database.js'; // Adjust the path as necessary

const User = neon.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'users'
});

export default User;