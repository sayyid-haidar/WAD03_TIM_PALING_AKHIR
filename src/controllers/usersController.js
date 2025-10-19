const usersService = require('../services/usersService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { username, name, email, role } = req.body;
    if (!username || !name || !email || !role) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }
    try {
        const newUser = await usersService.createUser({ username, name, email, role });
        res.status(201).json(newUser);
    } catch (err) {
        // Jika username sudah ada, service akan melempar error
        res.status(409).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const usernameParam = req.params.username;
    const { username, name, email, role } = req.body;
    if (!username || !name || !email || !role) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }
    try {
        const updatedUser = await usersService.updateUser(usernameParam, { username, name, email, role });
        res.json(updatedUser);
    } catch (err) {
        if (err.message === 'User tidak ditemukan') {
            res.status(404).json({ message: err.message });
        } else {
            // Error lain, misal: username baru sudah dipakai
            res.status(409).json({ message: err.message });
        }
    }
};
