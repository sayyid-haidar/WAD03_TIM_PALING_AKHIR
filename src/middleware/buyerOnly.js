const buyerOnly = (req, res, next) => {
    // Middleware ini berasumsi 'authenticate' sudah dijalankan sebelumnya
    // dan req.user sudah ada.
    if (req.user && req.user.role === 'buyer') {
        next(); // User adalah buyer, lanjutkan
    } else {
        res.status(403).json({ message: 'Akses ditolak. Hanya untuk buyer.' }); // 403 Forbidden
    }
};

module.exports = buyerOnly;