import { ROLES } from "../models/Role";
import config from "../config";
//Database connection
import { connect } from "../database";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const db = await connect(config.dbname);
    /*const user = await db
      .collection("users")
      .findOne({ username: req.body.username });
    if (user)
      return res.status(400).json({ message: "The user already exists" });
*/
    const email = await db
      .collection(config.usercol)
      .findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };
