const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/not-found-err");
require("dotenv").config();

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "user not found" }));
};

module.exports.getUserMe = async (req, res, next) => {
  try {
    const { user } = req;
    const id = user._id;
    const data = await User.findById(id);
    if (!data) {
      const validatorError = new validatorError("User not found");
      return next(validatorError);
    }

    return res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(404).send({ message: "ID de usuario no encontrado" })
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) =>
        res.status(400).send({ message: "alguno de los datos es incorrecto" })
      )
  );
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res
        .status(400)
        .send({ message: "Los datos son incorrectos, por favor revisalos" })
    );
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send({ status: true, data: user }))
    .catch((err) =>
      res
        .status(400)
        .send({ message: "La direccion es incorrecta, , por favor revisala" })
    );
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: "Los datos son incorrectos, por favor revisalos" });
    });
};
