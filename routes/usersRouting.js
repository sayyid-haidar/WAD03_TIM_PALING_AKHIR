const express = require('express');
const router = express.Router();


let users = [
    { username: 'alicece', name: 'Alice', email: 'alice@gmail.com', role: 'pembeli' },
    { username: 'aloyloy', name: 'aloy', email: 'aloy@gmail.com', role: 'seller' },
    { username: 'sandrasan', name: 'sandra', email: 'sandra@gmail.com', role: 'seller' },
];

// GET all users
router.get('/', (req, res) => {
    res.json(users);
});

// POST new user
router.post('/', (req, res) => {
    const { username, name, email, role } = req.body;
    if (!username || !name || !email || !role) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }
    const usernameLower = username.toLowerCase();
    const exists = users.some(u => u.username === usernameLower);
    if (exists) {
        return res.status(409).json({ message: 'Username sudah digunakan' });
    }
    const newUser = { username: usernameLower, name, email, role };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update user by username

router.put('/:username', (req, res) => {
    const usernameParam = req.params.username.toLowerCase();
    const { username, name, email, role } = req.body;
    if (!username || !name || !email || !role) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }
    // Cek jika username baru sudah digunakan oleh user lain
    const usernameLower = username.toLowerCase();
    const exists = users.some(u => u.username === usernameLower && u.username !== usernameParam);
    if (exists) {
        return res.status(409).json({ message: 'Username sudah digunakan' });
    }
    const userIdx = users.findIndex(u => u.username === usernameParam);
    if (userIdx === -1) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    users[userIdx] = { username: usernameLower, name, email, role };
    res.json(users[userIdx]);
});

console.log('usersRouting.js loaded');

module.exports = router;
console.log('usersRouting.js exported');

