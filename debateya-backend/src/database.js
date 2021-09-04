import MongoClient from "mongodb";
import config from "./config";
export async function connect(dbname) {
  try {
    const client = await MongoClient.connect(config.mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbname);
    console.log(`conectado a la base de datos ${dbname}`);
    return db;
  } catch (e) {
    console.log(e);
  }
}
