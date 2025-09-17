const express = require('express');
const router = express.Router();

// GET /aboutus - API information
const fs = require('fs');
const path = require('path');

router.get('/:name', (req, res) => {
	const nameParam = req.params.name.toLowerCase().replace(/\s/g, '');
	const packageJsonPath = path.join(__dirname, '../package.json');
	const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
	const anggota = packageData['anggota'] || [];
	const filtered = anggota.filter(a =>
		a.name.toLowerCase().replace(/\s/g, '') === nameParam
	);
	if (filtered.length > 0) {
		res.json(filtered[0]);
	} else {
		res.status(404).json({ message: 'Anggota tidak ditemukan' });
	}
});


module.exports = router;