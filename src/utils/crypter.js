import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds

export async function hasher(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err; // Rethrow to be handled by the caller
    }
}

export async function verifyPassword(enteredPassword, storedHashedPassword) {
    try {
        return await bcrypt.compare(enteredPassword, storedHashedPassword);
    } catch (err) {
        console.error('Error verifying password:', err);
        throw err; // Rethrow to be handled by the caller
    }
}
