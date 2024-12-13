const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getCards,
  createCard,
  addLike,
  deleteLike,
} = require("../controllers/cards");

router.get("/cards", auth, getCards);
router.post("/cards", auth, createCard);
router.put("/cards/:cardId/likes", auth, addLike);
router.delete("/cards/:cardId/likes", auth, deleteLike);

module.exports = router;
