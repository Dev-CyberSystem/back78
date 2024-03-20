import UsuarioModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Buscar  All Usuarios
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.find();
    res.json(usuarios);
    console.log(usuarios);
  } catch (error) {
    console.log(error);
  }
};

// Registro de usuario

const registroUsuario = async (req, res) => {
  console.log(req.body, "body");
  try {
    const { nombre, apellido, email, password } = req.body;
    const salt = await bcrypt.genSalt(10); // Generar un salt para encriptar la contraseña con bcrypt, el número 10 es el número de veces que se va a encriptar la contraseña.
    const passwordHash = await bcrypt.hash(password, salt); // Encriptar la contraseña con bcrypt
    const usuario = new UsuarioModel({
      nombre,
      apellido,
      email,
      password: passwordHash,
    });
    await usuario.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
    console.log(res.status, "status");
  } catch (error) {
    res.status(400).json({ message: "Error al registrar el usuario" });
    console.log(error);
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioModel.findByIdAndDelete(id);
    res.json(usuario);
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllUsers,
  registroUsuario,
  deleteUser
};
