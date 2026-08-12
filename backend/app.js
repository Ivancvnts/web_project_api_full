const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const cards = require("./routes/cards");
const { createUser, login } = require("../controllers/users");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

const { PORT = 3000 } = process.env;

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/users", users);
app.use("/cards", cards);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "Error interno del servidor" : err.message;
  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
