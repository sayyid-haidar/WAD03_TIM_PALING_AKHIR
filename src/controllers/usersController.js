const usersService = require('../services/usersService');

exports.getAllUsers = (req, res) => {
    const users = usersService.getAllUsers();
    res.json(users);
};

exports.createUser = (req, res) => {
    const { username, name, email, role } = req.body;
    if (!username || !name || !email || !role) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }
    try {
        const newUser = usersService.createUser({ username, name, email, role });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

exports.updateUser = (req, res) => {
    const usernameParam = req.params.username;
    const { username, name, email, role } = req.body;
    if (!username || !name || !email || !role) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }
    try {
        const updatedUser = usersService.updateUser(usernameParam, { username, name, email, role });
        res.json(updatedUser);
    } catch (err) {
        if (err.message === 'User tidak ditemukan') {
            res.status(404).json({ message: err.message });
        } else {
            res.status(409).json({ message: err.message });
        }
    }
};
