//Database connection
import { connect } from "../database";
import config from "../config";
import { getPagination } from "../helpers/getPagination";
export const data = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const db = await connect(config.dbname);
    const list = await db
      .collection(config.questioncol)
      .find({}, { limit, skip: offset })
      .toArray();
    const count = await db
      .collection(config.questioncol)
      .estimatedDocumentCount();
    res.json({ list, count });
  } catch (e) {
    console.log(e);
    res.json({ message: "something was wrong" });
  }
};

export const dataproof = async (req, res) => {
  const db = await connect(config.dbname);
  const result = await db.collection(config.questioncol).find({}).toArray();
  /*conjunto de diccionarios de cada pregunta*/
  let array = [];
  result.map((el) => {
    console.log("el", el);
    /* diccionario : nombre de la pregunta, descripción , labels, data */
    let diccionario = {
      _id: el._id,
      title: el.title,
      description: el.description,
      labels: el.options,
    };
    el.listvoters.map((x) => {
      if (!diccionario.hasOwnProperty(x.option)) {
        diccionario[x.option] = 1;
      } else {
        diccionario[x.option] += 1;
      }
    });
    diccionario.data = [];
    diccionario.labels.map((label) => {
      if (diccionario.hasOwnProperty(label)) {
        diccionario.data.push(diccionario[label]);
      } else {
        diccionario.data.push(0);
      }
    });

    array.push(diccionario);
  });
  console.log(array);
  res.json(array);
};
