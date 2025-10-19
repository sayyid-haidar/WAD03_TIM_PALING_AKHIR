const db = require('../../database'); // Sekarang ini adalah object Sequelize

async function getAll() {
    // Menggunakan metode findAll() dari Sequelize
    const users = await db.users.findAll();
    return users;
}

async function findByUsername(username) {
    // Menggunakan metode findOne() dari Sequelize
    const user = await db.users.findOne({ where: { username: username } });
    return user;
}

async function create({ username, name, email, role }) {
    // Menggunakan metode create() dari Sequelize
    const newUser = await db.users.create({ username, name, email, role });
    return newUser;
}

async function update(usernameParam, { username, name, email, role }) {
    // 1. Cari user yang akan diupdate
    const userToUpdate = await db.users.findOne({ where: { username: usernameParam } });

    // 2. Jika ditemukan, update nilainya
    if (userToUpdate) {
        userToUpdate.username = username;
        userToUpdate.name = name;
        userToUpdate.email = email;
        userToUpdate.role = role;
        
        // 3. Simpan perubahan ke database
        await userToUpdate.save();
        return userToUpdate;
    }
    return null; // Kembalikan null jika user tidak ditemukan
}

module.exports = {
    getAll,
    findByUsername,
    create,
    update,
};