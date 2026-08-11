const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const cards = require("./routes/cards");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6a546bb831d1394b2152052f",
  };

  next();
});

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
