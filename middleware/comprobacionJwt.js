import jwt from "jsonwebtoken";

const comprobacionJwt = (req, res, next) => {
    console.log(req.headers.authorization, "req")
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado no es un Admin" });
  }

  try {
    const varifyToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = varifyToken; // guardar el usuario en el req
    next();
  } catch (error) {
    console.log(error);
  }
};

export default comprobacionJwt;
