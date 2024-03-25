import UsuarioModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  try {
    const { nombre, apellido, email, password, admin } = req.body;
    const salt = await bcrypt.genSalt(10); // Generar un salt para encriptar la contraseña con bcrypt, el número 10 es el número de veces que se va a encriptar la contraseña.
    const passwordHash = await bcrypt.hash(password, salt); // Encriptar la contraseña con bcrypt
    const usuario = new UsuarioModel({
      nombre,
      apellido,
      email,
      password: passwordHash,
      admin,
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
// editar un usuario

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, admin } = req.body;

    const usuario = await UsuarioModel.findByIdAndUpdate(
      id,
      { nombre, apellido, admin },
      { new: true } //devuelve el usuario actualizado
    );
    res.json(usuario);
  } catch (error) {
    console.log(error);
  }
};

// login de usuario.

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await UsuarioModel.findOne({ email });

    if (!usuario) {
      return res
        .status(400)
        .json({ message: "Usuario y/o Password incorrecto" });
    }

    const comparePass = await bcrypt.compare(password, usuario.password);

    if (!comparePass) {
      return res
        .status(400)
        .json({ message: "Usuario y/o Password incorrecto" });
    }

    // Crear el token

    const token = jwt.sign(
      // crear el payload o el cuerpo del token.- Tiene todos los datos que nosotros veamos convenientes compartir e incluso tiene el vencimiento del token)
      {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        admin: usuario.admin,
      },
      process.env.SECRET_KEY, // la clave secreta que se va a utilizar para encriptar el token
      {
        expiresIn: 86400,
      } // 24 horas
    );

    res.header(token).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al iniciar sesión" });
    res.status(500).json({ message: "Error de servidor" });
  }
};

export default {
  getAllUsers,
  registroUsuario,
  deleteUser,
  login,
  updateUser
};
