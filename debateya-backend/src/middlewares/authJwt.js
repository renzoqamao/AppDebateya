import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import config from "../config";
//Database connection
import { connect } from "../database";

export const verifyToken = async (req, res, next) => {
  let token = req.headers[config.tokenheader2];
  console.log("tokenconfig:", config.tokenheader2);
  console.log("token:", token);
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const db = await connect(config.dbname);
    const user = await db
      .collection(config.usercol)
      .find({ _id: req.userId }, { password: 0 })
      .toArray();
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const db = await connect(config.dbname);
    const user = await db
      .collection(config.usercol)
      .findOne({ _id: ObjectID(req.userId) });
    const roles = await db
      .collection(config.rolecol)
      .find({ _id: { $in: user.roles.map((e) => ObjectID(e)) } })
      .toArray();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const db = await connect(config.dbname);
    const user = await db
      .collection(config.usercol)
      .findOne({ _id: ObjectID(req.userId) });
    const roles = await db
      .collection(config.rolecol)
      .find({ _id: { $in: user.roles.map((e) => ObjectID(e)) } })
      .toArray();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "administrator") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
