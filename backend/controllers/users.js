const User = require("../models/user");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningun usuario con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de usuario no valido";
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ningun usuario con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Datos invalidos";
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ningun usuario con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Datos invalidos";
      }
      next(err);
    });
};
