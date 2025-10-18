const usersRepo = require('../repositories/usersRepository');

// Middleware untuk mensimulasikan user yang sedang login
// Ambil username dari header 'x-username'
const authenticate = async (req, res, next) => {
    const username = req.headers['x-username'];
    if (!username) {
        return res.status(401).json({ message: 'Akses ditolak. Header x-username tidak ditemukan.' });
    }

    try {
        const user = await usersRepo.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Akses ditolak. User tidak valid.' });
        }

        req.user = user; // Simpan data user di object request
        next(); // Lanjutkan ke proses selanjutnya
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = authenticate;