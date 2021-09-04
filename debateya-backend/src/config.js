import { config } from "dotenv";
config();
export default {
  mongodbURL: process.env.MONGODB_URI,
  SECRET: process.env.SECRET,
  Origin: process.env.ORIGIN,
  dbname: process.env.DBNAME,
  usercol: process.env.USERSCOLLECTION,
  questioncol: process.env.QUESTIONSCOLLECTION,
  dashboardcol: process.env.DASHBOARDSCOLLECTION,
  rolecol: process.env.ROLESCOLLECTION,
  tokenheader: process.env.TOKENHEADER,
  tokenheader2: process.env.TOKENHEADER2,
};
