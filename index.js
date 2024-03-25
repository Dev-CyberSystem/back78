import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import privateRouter from "./router/private.router.js";
import comprobacionJwt from "./middleware/comprobacionJwt.js";
import connectDB from "./database/db.js";

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

//Rutas
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", comprobacionJwt,  privateRouter);

// endpoint de prueba
//http://localhost:8080/api/admin

const initApp = () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

initApp();
