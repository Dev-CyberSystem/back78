import express from "express";
import UsuarioModel from "../models/userModel.js";

const router = express.Router();

//Traer los usuarios
router.get("/users", async (req, res) => {
  try {
    const usuarios = await UsuarioModel.find();
    res.json(usuarios);
    console.log(usuarios)
  } catch (error) {
    console.log(error);
  }
});

//Traer un usuario

//Crear un usuario

//Actualizar un usuario

//Eliminar un usuario

export default router; // exportamos el router para poder usarlo en otro archivo
