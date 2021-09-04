import { Schema, model } from "mongoose";
export const ROLES = ["user", "administrator", "moderator"];

/**
 * @swagger
 * components:
 *  schemas:
 *      Role:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description : it's generated from mongodb
 *              name:
 *                  type: string
 *                  description : name's Role.
 */
const RoleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);
export default model("Role", RoleSchema);
