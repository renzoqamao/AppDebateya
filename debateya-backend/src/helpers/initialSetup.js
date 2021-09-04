//Database connection
import { connect } from "../database";
import config from "../config";

export const createRoles = async () => {
  try {
    const db = await connect(config.dbname);
    const count = await db.collection(config.rolecol).estimatedDocumentCount();
    if (count > 0) return;
    await db
      .collection(config.rolecol)
      .insertMany([
        { name: "user" },
        { name: "moderator" },
        { name: "administrator" },
      ]);
  } catch (e) {
    console.log(e);
  }
};
