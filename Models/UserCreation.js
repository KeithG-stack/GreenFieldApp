import { User } from './DatabaseCreation.js';
import bcrypt from 'bcryptjs';

async function createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({
        name: username,
        email: email,
        password: hashedPassword
    });
}

export default createUser;