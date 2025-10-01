exports.getWelcome = (req, res) => {
  res.json({ message: "Selamat datang di API kami!" });
};

exports.getGreeting = (req, res) => {
  const name = req.query.name;
  if (name) {
    res.json({ message: `hello ${name}` });
  } else {
    res.json({ message: "hello" });
  }
};
