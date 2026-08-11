const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

const users = require("express").Router();

users.get("/", getUsers);

users.get("/:id", getUser);

users.post("/", createUser);

users.patch("/me", updateUser);

users.patch("/me/avatar", updateAvatar);

module.exports = users;
