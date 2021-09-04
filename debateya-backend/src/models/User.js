import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description : it's generated from mongodb
 *              name:
 *                  type: string
 *                  description : name's user.
 *              lastname:
 *                  type: string
 *                  description: lastname's user.
 *              email:
 *                  type: string
 *                  format : email
 *              dni:
 *                  type: number
 *                  description : dni's user.
 *              age:
 *                  type: number
 *                  description: age's user.
 *              gender:
 *                  type: string
 *                  description : gender's user.
 *                  enum:
 *                      - male
 *                      - female
 *              password:
 *                  type: string
 *                  format : password
 *              auth:
 *                  type: bolean
 *                  description: it's usefully to know a state of user(On or Off)
 *              roles:
 *                  type : string
 *                  $ref : '#/components/schemas/Role'
 *          required:
 *              email
 *              password
 *      Usertoken:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description : it's generated from mongodb
 *              name:
 *                  type: string
 *                  description : name's user.
 *              lastname:
 *                  type: string
 *                  description: lastname's user.
 *              email:
 *                  type: string
 *                  format : email
 *              dni:
 *                  type: number
 *                  description : dni's user.
 *              age:
 *                  type: number
 *                  description: age's user.
 *              gender:
 *                  type: string
 *                  description : gender's user.
 *                  enum:
 *                      - male
 *                      - female
 *              password:
 *                  type: string
 *                  format : password
 *              auth:
 *                  type: bolean
 *                  description: it's usefully to know a state of user(On or Off)
 *              roles:
 *                  type : string
 *                  $ref : '#/components/schemas/Role'
 *              token:
 *                  type : string
 *          required:
 *              email
 *              password
 */
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dni: {
      type: Number,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    auth: {
      type: Boolean,
      default: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// Metodos de instancias
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
UserSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

// metodos de modelos
UserSchema.statics.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
UserSchema.statics.comparePassword = async function (pass, receivedpass) {
  return await bcrypt.compare(pass, receivedpass);
};

export default model("User", UserSchema);
