const usersRepo = require('../repositories/usersRepository');

function getAllUsers() {
    return usersRepo.getAll();
}

async function createUser({ username, name, email, role }) {
    const usernameLower = username.toLowerCase();
    const existingUser = await usersRepo.findByUsername(usernameLower);
    if (existingUser) {
        throw new Error('Username sudah digunakan');
    }
    return usersRepo.create({ username: usernameLower, name, email, role });
}

async function updateUser(usernameParam, { username, name, email, role }) {
    const targetUser = await usersRepo.findByUsername(usernameParam.toLowerCase());
    if (!targetUser) {
        throw new Error('User tidak ditemukan');
    }

    const usernameLower = username.toLowerCase();
    if (usernameLower !== usernameParam.toLowerCase()) {
        const existingUser = await usersRepo.findByUsername(usernameLower);
        if (existingUser) {
            throw new Error('Username sudah digunakan');
        }
    }

    return usersRepo.update(usernameParam.toLowerCase(), { username: usernameLower, name, email, role });
}

module.exports = { getAllUsers, createUser, updateUser };