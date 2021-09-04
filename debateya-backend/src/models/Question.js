import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * @swagger
 * components:
 *  schemas:
 *      Voter:
 *          type: object
 *          properties:
 *              user:
 *                  $ref : '#/components/schemas/User'
 *              option:
 *                  type: string
 *                  description : answer option.
 *              nchanges:
 *                  type: number
 *                  description : number of changes remaining.
 *      Question:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description : it's generated from mongodb
 *              user:
 *                  $ref : '#/components/schemas/User'
 *              title:
 *                  type: string
 *                  description : title's Role.
 *              nchange:
 *                  type: number
 *                  description : maximum changes.
 *              description:
 *                  type: string
 *                  description : description's question.
 *              options:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description : answer options.
 *                      enum:
 *                          - yes
 *                          - no
 *                          - maybe
 *              data:
 *                  type: array
 *                  items:
 *                      type : number
 *                      description : voters by choice.
 *              listvoters:
 *                  type: array
 *                  items:
 *                      $ref : '#/components/schemas/Voter'
 */
const QuestionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    listvoters: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        option: { type: String },
        nchanges: { type: Number },
      },
    ],
    nchange: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    options: [{ type: String, required: true }],
    creation: { type: Date },
    expires: { type: Date },
    data: {
      type: Map,
      of: Number,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);
QuestionSchema.plugin(mongoosePaginate);
// Data -> type Array
QuestionSchema.statics.createArray = async function (tam) {
  return await Array.apply(null, new Array(tam)).map(
    Number.prototype.valueOf,
    0
  );
};
// Data -> type Map
QuestionSchema.statics.createDict = async function (options) {
  const diccionario = {};
  await options.map((x) => {
    if (!diccionario.hasOwnProperty(x)) diccionario[x] = 0;
  });
  return diccionario;
};

export default model("Question", QuestionSchema);
