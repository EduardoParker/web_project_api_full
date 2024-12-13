module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startWith("Bearer")) {
    return res.status(401).send({ message: "Se requiere autorización" });
  }
  const token = authorization.replace("Bearer", "");
  //const payload = jwt.verify(token , "fufupapachon")
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    /*catch (err) {
    return res.status(401).send({ message: "Se requiere autorización" });*/
    const err = new Error("Se requiere autorización");
    err.statusCode = 401;
    next(err);
  }
  req.user = payload;
  next();
};
