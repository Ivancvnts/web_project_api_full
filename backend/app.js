require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const users = require("./routes/users");
const cards = require("./routes/cards");
const { createUser, login } = require("./controllers/users");

const auth = require("./middleware/auth");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { PORT = 3000, MONGO_URI = "mongodb://localhost:27017/aroundb" } =
  process.env;

const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", users);
app.use("/cards", cards);

app.use(errorLogger);
//Celebrate error controller
app.use(errors());
//Error controller
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
