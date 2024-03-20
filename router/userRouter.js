import express from "express";
import usersControllers from "../controllers/usersControllers.js";
const router = express.Router();

//Traer los usuarios

router.get("/users", usersControllers.getAllUsers);

//Traer un usuario

//registro de un usuario
router.post("/register", usersControllers.registroUsuario);

//Actualizar un usuario

//Eliminar un usuario
router.delete("/user/:id", usersControllers.deleteUser);

export default router; // exportamos el router para poder usarlo en otro archivo
