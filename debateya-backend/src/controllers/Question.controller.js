import Question from "../models/Question";
import { getPagination } from "../helpers/getPagination";
import config from "../config";
//Database connection
import { connect } from "../database";
import { ObjectID } from "mongodb";

export const list = async (req, res) => {
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
export const add = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      nchange,
      listvoters,
      options,
      creation,
      expires,
    } = req.body;
    const db = await connect(config.dbname);
    const new_question = new Question({
      user: new ObjectID(id),
      title,
      description,
      nchange,
      listvoters,
      options,
      creation,
      expires,
      data: await Question.createDict(options),
    });

    await db.collection(config.questioncol).insertOne(new_question);

    res.json({ message: `Question creation sucessfully.` });
  } catch (e) {
    res.json({ message: "something was wrong." });
  }
};

export const findbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connect(config.dbname);
    const questionFound = await db
      .collection(config.questioncol)
      .findOne({ _id: ObjectID(id) });
    if (!questionFound) return res.json({ message: `not found` });
    res.json(questionFound);
  } catch (e) {
    console.log(e);
    res.json({ message: "something was wrong" });
  }
};
/* get number of changes left of voter  */
export const get_changes_voter = async (req, res) => {
  try {
    const { question_id, voter_id } = req.params;
    const db = await connect(config.dbname);
    const question = await db
      .collection(config.questioncol)
      .findOne({ _id: ObjectID(question_id) });

    const voter = question.listvoters.filter(
      (element) => element.user.toString() === voter_id
    );
    // si la lista de votantes no esta vacia se envia la cantidad de cambio de votos restantes..
    if (voter.length !== 0) return res.json({ nchanges: voter[0].nchanges });
    res.json({ nchanges: question.nchange });
  } catch (e) {
    console.log(e);
    res.json({ message: "something was wrong" });
  }
};
/* Add voter  */
import { calculateStadistics } from "../helpers/stadistics";
export const addvoter = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.body.voter;
    const db = await connect(config.dbname);

    // validate  id
    const userFound = await db
      .collection(config.usercol)
      .findOne({ _id: ObjectID(user_id) });
    if (!userFound) return res.json({ message: "user doesn't exists." });

    let query = { _id: ObjectID(id) };
    /* pull a voter  */
    let pull_voter = { $pull: { listvoters: { user: ObjectID(user_id) } } };
    /* push  a voter */
    let push_voter = {
      $push: {
        listvoters: {
          user: new ObjectID(user_id),
          option: req.body.option,
          nchanges: req.body.nchanges,
        },
      },
    };
    // updateOne -> findOneAndReplace
    await db.collection(config.questioncol).updateOne(query, pull_voter);
    await db.collection(config.questioncol).updateOne(query, push_voter);

    // calculando la estadistica
    const questionFound = await db
      .collection(config.questioncol)
      .findOne({ _id: ObjectID(id) });
    console.log(questionFound);
    const diccionario = await calculateStadistics(questionFound);
    await db
      .collection(config.questioncol)
      .updateOne({ _id: ObjectID(id) }, { $set: { data: diccionario } });
    res.json({ message: "successfully" });
  } catch (e) {
    console.log(e);
    res.json({ message: "something was wrong." });
  }
};
export const deletebyid = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connect(config.dbname);
    await db.collection(config.questioncol).removeOne({ _id: ObjectID(id) });
    res.json({ message: `question with id ${id} deleted.` });
  } catch (e) {
    console.log(e);
    res.json({ message: "something was wrong." });
  }
};
