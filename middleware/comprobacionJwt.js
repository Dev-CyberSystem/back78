import jwt from "jsonwebtoken";

const comprobacionJwt = (req, res, next) => {
  console.log(req.headers.authorization, "req");
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado no es un Admin" });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verifyToken; // guardar el usuario en el req

    if (verifyToken.admin) {
      console.log("es admin");
      next();
    } else {
      console.log("no es admin");
      return res
        .status(401)
        .json({ message: "Acceso denegado no es un Admin" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default comprobacionJwt;
