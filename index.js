import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import connectDB from "./database/db.js";

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

//Rutas
app.use(express.json());

app.use("/api", userRouter);

// endpoint de prueba
//http://localhost:8080/api/users

const initApp = () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Servidores iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

initApp();
