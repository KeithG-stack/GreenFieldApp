import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { neon } from '../Config/database.js'; // Adjust the path as necessary

// Define the Faculty model
const Faculty = neon.define('Faculty', {
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
    },
    securityNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [10, 10] // Ensure the security number is exactly 10 digits
        }
    }
}, {
    timestamps: true,
    tableName: 'faculties'
});

// Function to create a new faculty member
async function createFaculty(name, email, password, securityNumber) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return Faculty.create({
        name,
        email,
        password: hashedPassword,
        securityNumber
    });
}

// Function to authenticate a faculty member
async function authenticateFaculty(securityNumber, password) {
    const faculty = await Faculty.findOne({ where: { securityNumber } });
    if (!faculty) {
        throw new Error('Invalid security number or password');
    }

    const isPasswordValid = await bcrypt.compare(password, faculty.password);
    if (!isPasswordValid) {
        throw new Error('Invalid security number or password');
    }

    return faculty;
}

export { Faculty, createFaculty, authenticateFaculty };