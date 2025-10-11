const usersRepo = require('../repositories/usersRepository');

function getAllUsers() {
    return usersRepo.getAll();
}

function createUser({ username, name, email, role }) {
    const users = usersRepo.getAll();
    const usernameLower = username.toLowerCase();
    if (users.some(u => u.username === usernameLower)) {
        throw new Error('Username sudah digunakan');
    }
    const newUser = { username: usernameLower, name, email, role };
    users.push(newUser);
    usersRepo.saveAll(users);
    return newUser;
}

function updateUser(usernameParam, { username, name, email, role }) {
    const users = usersRepo.getAll();
    const usernameLower = username.toLowerCase();
    const idx = users.findIndex(u => u.username === usernameParam.toLowerCase());
    if (idx === -1) throw new Error('User tidak ditemukan');
    if (users.some(u => u.username === usernameLower && u.username !== usernameParam.toLowerCase())) {
        throw new Error('Username sudah digunakan');
    }
    users[idx] = { username: usernameLower, name, email, role };
    usersRepo.saveAll(users);
    return users[idx];
}

module.exports = { getAllUsers, createUser, updateUser };