import express from "express";
import usersControllers from "../controllers/usersControllers.js";
const router = express.Router();

//Traer los usuarios

router.get("/users", usersControllers.getAllUsers);

//Traer un usuario

//registro de un usuario

router.post("/register", usersControllers.registroUsuario);

//Actualizar un usuario
    router.patch("/user/:id", usersControllers.updateUser);

    //Eliminar un usuario
router.delete("/user/delete/:id", usersControllers.deleteUser);

//login de usuario

router.post("/login", usersControllers.login);

export default router; // exportamos el router para poder usarlo en otro archivo
