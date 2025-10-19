const sellerOnly = (req, res, next) => {
    // Middleware ini berasumsi `authenticate` sudah dijalankan sebelumnya
    if (req.user && req.user.role === 'seller') {
        next(); // User adalah seller, lanjutkan
    } else {
        res.status(403).json({ message: 'Akses ditolak. Hanya untuk seller.' }); // 403 Forbidden
    }
};

module.exports = sellerOnly;