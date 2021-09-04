//Database connection
import { connect } from "../database";
import config from "../config";

export const listparticipants = async (req, res) => {
  const db = await connect(config.dbname);
  const result = await db
    .collection(config.usercol)
    .find({ auth: true })
    .toArray();
  console.log(result);
  res.json(result);
};
