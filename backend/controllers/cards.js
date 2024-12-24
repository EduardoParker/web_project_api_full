const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const Card = require("../models/card");
const path = require("path");

module.exports.getCards = (req, res, next) => {
  Card.find()
    .populate(["owner", "likes"])
    .then((card) => {
      res.send(card);
    })
    .catch((err) => res.status(404).send({ message: "imagen no encontrada" }));
};

module.exports.createCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      const fullCard = Card.findById(card._id)
        .populate(["owner"])
        .then((fullCard) => {
          res.send(fullCard);
        });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "Los datos son incorrectos, por favor revisalos" });
    });
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .orFail((error) => {
      throw new NotFoundError("Tarjeta no encontrada");
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .orFail((error) => {
      throw new NotFoundError("Tarjeta no encontrada");
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail((error) => {
      throw new BadRequestError("Invalid Request");
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
};
