const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cards = require("./routes/cards");
const users = require("./routes/users");
const bodyParser = require("body-parser");
const path = require("path");
const { login, createUser } = require("./controllers/users");
const { celebrate, Joi, errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
var cors = require("cors");

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//console.log(process.env);

const { PORT = 3000 } = process.env;
mongoose.connect("mongodb://localhost:27017/aroundb");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

app.use(requestLogger);
app.use(cors());
app.options("*", cors());

const allowedCords = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://master-in-heaven.mooo.com",
  "https://www.master-in-heaven.mooo.com",
];
//app.use(cors({ origin: allowedCords }));
app.use(function (req, res, next) {
  const { origin } = req.headers;
  if (allowedCords.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
  }
  const requestHeaders = req.headers["access-control-request-headers"];
  if (method === "OPTIONS") {
    // permitir solicitudes de dominio cruzado con estos encabezados
    res.header("Access-Control-Allow-Headers", requestHeaders);
    // terminar de procesar la solicitud y devolver el resultado al cliente
    return res.end();
  }
  next();
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .default(
          "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg"
        )
        .custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.use(cards);
app.use(users);

app.use((req, res, next) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
  next();
});

app.use(errorLogger);

app.use(errors()); //controlador de errores del validador

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message || "Se ha producido un error en el servidor",
  });
});

app.use(express.static(path.join(__dirname, "/")));
app.listen(PORT, () => {
  console.log(`${PORT} escuchando`);
});
