const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const cards = require("express").Router();

cards.get("/", getCards);

cards.post("/", createCard);

cards.delete("/:id", deleteCard);

cards.put("/:cardId/likes", likeCard);

cards.delete("/:cardId/likes", dislikeCard);

module.exports = cards;
