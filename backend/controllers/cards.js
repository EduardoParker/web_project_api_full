const Card = require("../models/card");
const path = require("path");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(404).send({ message: "imagen no encontrada" }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) =>
      res.send({
        status: true,
        card,
      })
    )
    .catch((err) => {
      res
        .status(400)
        .send({ message: "Los datos son incorrectos, por favor revisalos" });
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .orFail()
    .then((card) => res.send({ status: true, card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.send({ status: true, card }))
    .catch((err) => res.status(500).send({ message: err }));
};
