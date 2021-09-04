import jwt from "jsonwebtoken";
import User from "../models/User";
import config from "../config";
//Database connection
import { connect } from "../database";
import { ObjectID } from "mongodb";

export const list = async (req, res) => {
  try {
    const db = await connect(config.dbname);
    const listusers = await db.collection(config.usercol).find({}).toArray();
    if (!listusers) return res.json({ message: "no users" });
    res.json(listusers);
  } catch (e) {
    console.log(e);
    return res.json({ message: "something was wrong" });
  }
};
export const signup = async (req, res) => {
  try {
    const { name, lastname, email, password, age, gender, dni, auth } =
      req.body;
    const new_user = new User({
      name,
      lastname,
      email,
      password,
      age,
      gender,
      dni,
      auth,
    });

    new_user.password = await new_user.encryptPassword(password);

    const db = await connect(config.dbname);
    await db.collection(config.usercol).insertOne(new_user);

    res.json({ message: "Done" });
  } catch (e) {
    console.log(e);
    return res.json({ message: "something was wrong" });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // conectarse a la base de datos
    const db = await connect(config.dbname);
    // buscar el usuario
    const userFound = await db.collection(config.usercol).findOne({ email });

    // verificar la existencia del usuario
    if (!userFound) return res.json({ message: `email doesn't exists.` });

    // verifica la contraseña
    const id = userFound._id;
    delete userFound._id;
    const match = await new User(userFound).matchPassword(password);
    if (!match) return res.json({ message: `incorrect password` });

    await db
      .collection(config.usercol)
      .updateOne({ _id: ObjectID(id) }, { $set: { auth: true } });

    userFound.auth = true;
    userFound._id = id;
    // asigna un token
    userFound.token = jwt.sign({ id }, config.SECRET, {
      expiresIn: 86400,
    });
    res.json(userFound);
  } catch (e) {
    console.log(e);
    res.json({ message: "something was wrong" });
  }
};
export const findbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connect(config.dbname);
    const userFound = await db
      .collection(config.usercol)
      .findOne({ _id: ObjectID(id) });
    if (!userFound) return res.json({ message: `not found` });
    res.json(userFound);
  } catch (e) {
    console.log(e);
    res.json({ message: `something was wrong` });
  }
};
export const updatebyid = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connect(config.dbname);
    const userFound = await db
      .collection(config.usercol)
      .findOne({ _id: ObjectID(id) });
    if (!userFound) return res.json({ err: `not found` });
    const match = await User.comparePassword(
      req.body.password,
      userFound.password
    );
    if (!match) return res.json({ err: `incorrect password` });
    const {
      name = name ? name : userFound.name,
      lastname = lastname ? lastname : userFound.lastname,
      password = password ? password : userFound.password,
      age = age ? age : userFound.age,
      dni = dni ? dni : userFound.dni,
    } = req.body;
    await db
      .collection(config.usercol)
      .updateOne(
        { _id: ObjectID(id) },
        { $set: { name, lastname, password, age, dni } }
      );
    res.json({ message: `user with ${id} has been update.` });
  } catch (e) {
    console.log(e);
    res.json({ err: "something was wrong" });
  }
};
export const deletebyid = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connect(config.dbname);
    const userFound = await db
      .collection(config.usercol)
      .findOne({ _id: ObjectID(id) });

    if (!userFound) return res.json({ message: "user doesn't exists." });

    await db.collection(config.usercol).removeOne({ _id: ObjectID(id) });
    res.json({ message: `user with ${id} deleted.` });
  } catch (e) {
    console.log(e);
    res.json({ message: "something was wrong" });
  }
};
/* Delete All users*/
export const deleteall = async (req, res) => {
  try {
    const db = await connect(config.dbname);
    await db.collection(config.usercol).deleteMany();
    res.json({ message: ` works.` });
  } catch (e) {
    console.log(e);
    res.json({ message: "something was wrong" });
  }
};
