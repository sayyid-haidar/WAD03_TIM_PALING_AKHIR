const express = require("express");
const path = require("path");

const usersRouter = require("./src/routes/usersRouting");
const productsRouter = require("./src/routes/productsRoute");
const cartsRouter = require("./src/routes/cartsRoute");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});

module.exports = app;
