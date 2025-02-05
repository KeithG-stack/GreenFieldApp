import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { neon } from '../Config/database.js'; // Adjust the path as necessary

// Define the Admin model
const Admin = neon.define('Admin', {
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
    tableName: 'admins'
});

// Function to create a new admin
async function createAdmin(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return Admin.create({
        name,
        email,
        password: hashedPassword
    });
}

// Function to authenticate an admin
async function authenticateAdmin(email, password) {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    return admin;
}

export { Admin, createAdmin, authenticateAdmin };