const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found-err.js");
const BadRequestError = require("../errors/bad-request-err.js");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email y contraseña son obligatorios"));
  }

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email: email,
        password: hash,
        name: name,
        about: about,
        avatar: avatar,
      }),
    )
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "around-secreto",
        {
          expiresIn: "7d",
        },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun usuario con esa id");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      returnDocument: "after",
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun usuario con esa id");
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        return next(new BadRequestError("Datos invalidos"));
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
      returnDocument: "after",
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun usuario con esa id");
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        return next(new BadRequestError("Datos invalidos"));
      }
      next(err);
    });
};
