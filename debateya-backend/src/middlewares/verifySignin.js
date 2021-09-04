import config from "../config";
//Database connection
import { connect } from "../database";

const checkEmailExist = async (req, res, next) => {
  try {
    const db = await connect(config.dbname);
    const userFound = await db
      .collection(config.usercol)
      .findOne({ email: req.body.email });
    if (!userFound) return res.json({ message: `email doesn't exists.` });
    req.userFound = userFound;
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkPassword = async (req, res, next) => {
  try {
    const userFound = req.userFound;
    delete userFound._id;
    const match = await new User(userFound).matchPassword(req.body.password);
    if (!match) return res.json({ message: `incorrect password` });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export { checkEmailExist, checkPassword };
