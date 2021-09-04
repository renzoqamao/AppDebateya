import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

//Database connection
import { connect } from "../database";
import { ObjectID } from "mongodb";

export const signup = async (req, res) => {
  const { name, lastname, email, password, age, gender, dni, auth, roles } =
    req.body;

  const new_user = new User({
    name,
    lastname,
    email,
    age,
    gender,
    dni,
    auth,
    password: await User.encryptPassword(password),
  });
  const db = await connect(config.dbname);
  // checking for roles
  if (roles) {
    const foundRoles = await db
      .collection(config.rolecol)
      .find({ name: { $in: roles } })
      .toArray();
    new_user.roles = foundRoles.map((role) => ObjectID(role._id));
  } else {
    const role = await db.collection(config.rolecol).findOne({ name: "user" });
    new_user.roles = [ObjectID(role._id)];
  }
  const result = await db.collection(config.usercol).insertOne(new_user);

  const userinserted = result.ops[0];
  const token = jwt.sign({ id: userinserted._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.json({ message: "Done", token });
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  // conectarse a la base de datos
  const db = await connect(config.dbname);
  // buscar el usuario
  const userFound = await db.collection(config.usercol).findOne({ email });
  // verificar la contraseña
  if (!userFound) return res.json({ message: `email doesn't exists.` });
  const match = await User.comparePassword(password, userFound.password);
  if (!match) return res.json({ message: `incorrect password` });

  // lo cambia a conectado
  await db
    .collection(config.usercol)
    .updateOne({ _id: ObjectID(userFound._id) }, { $set: { auth: true } });
  userFound.auth = true;

  // asigna un token
  userFound.token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.json(userFound);
};
export const signout = async (req, res) => {
  const { email, password } = req.body;
  // conectarse a la base de datos
  const db = await connect(config.dbname);
  // buscar el usuario
  const userFound = await db.collection(config.usercol).findOne({ email });
  // verificar la contraseña
  if (!userFound) return res.json({ message: `email doesn't exists.` });
  //no usada por el momento
  //const match = await User.comparePassword(password, userFound.password);
  //if (!match) return res.json({ message: `incorrect password` });

  // lo cambia a conectado
  await db
    .collection(config.usercol)
    .updateOne({ _id: ObjectID(userFound._id) }, { $set: { auth: false } });

  res.json({ message: `user log out.` });
};
