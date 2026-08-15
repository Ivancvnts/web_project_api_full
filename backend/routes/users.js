const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

const users = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../utils/validations.js");

users.get("/", getUsers);

users.get("/me", getUser);

users.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

users.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  updateAvatar,
);

module.exports = users;
