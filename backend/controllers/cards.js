const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate("owner")
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna card con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Datos invalidos";
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado una card con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "ID de la card invalida";
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado una card con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "ID de la card invalida";
      }
      next(err);
    });
};
