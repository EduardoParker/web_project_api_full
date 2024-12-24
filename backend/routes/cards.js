const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getCards,
  createCard,
  addLike,
  deleteLike,
  deleteCard,
} = require("../controllers/cards");

router.get("/cards", auth, getCards);
router.post("/cards", auth, createCard);
router.put("/cards/likes/:cardId", auth, addLike);
router.delete("/cards/likes/:cardId", auth, deleteLike);
router.delete("/cards/:cardId", auth, deleteCard);

module.exports = router;
