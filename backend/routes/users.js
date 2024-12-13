const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getUserMe,
} = require("../controllers/users");

router.get("/users", auth, getUsers);
router.get("/users/:id", auth, getUser);
router.patch("/users/me", auth, updateUser);
router.patch("/users/me/avatar", auth, updateUserAvatar);
router.get("/users/me", auth, getUserMe);

module.exports = router;
