module.exports = (req, res, next) => {
  // Asumsi req.user sudah diisi oleh middleware autentikasi
  if (req.user && req.user.role === 'buyer') {
    return next();
  }
  return res.status(403).json({ error: 'Akses hanya untuk buyer' });
};