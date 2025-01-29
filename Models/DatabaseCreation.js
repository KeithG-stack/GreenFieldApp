import { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

// Define the User model
const User = sequelize.define('User', {
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

// Connecting the DB to Sequelize
const createDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Force recreate tables
        await sequelize.sync({ force: true });
        console.log('Database and tables synchronized');
        
        // Insert sample data
        await insertSampleData();
    } catch (error) {
        console.error('Unable to initialize database:', error);
    }
};

// const insertSampleData = async () => {
//     try {
//         // Check if there are any users
//         const userCount = await User.count();
//         if (userCount === 0) {
//             // Create default user
//             const defaultUser = await User.create({
//                 name: 'Default User',
//                 email: 'default@example.com',
//                 password: await bcrypt.hash('password123', 10)
//             });
//             console.log('Default user created:', defaultUser.id);
//         }
//     } catch (error) {
//         console.error('Error inserting sample data:', error);
//     }
// };

export { createDatabase, User };