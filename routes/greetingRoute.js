const express = require("express");
const router = express.Router();

// GET /getting - API information
router.get("/", (req, res) => {
  res.json({ message: "Selamat datang di API kami!" });
});

// GET /greeting?name=Nama
router.get("/greeting", (req, res) => {
  const name = req.query.name;
  if (name) {
    res.json({ message: `hello ${name}` });
  } else {
    res.json({ message: "hello" });
  }
});

module.exports = router;
