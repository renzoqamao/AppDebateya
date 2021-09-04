import { Router } from "express";
import * as chatctrl from "../controllers/Chat.controller";
import { authJwt } from "../middlewares";

const router = Router();
/**
 * @swagger
 * tags:
 *  name : Chat
 *  description : Users endpoint
 */

/**
 * @swagger
 * /chat:
 *  get:
 *      summary: Returns a list of users online.
 *      tags: [Chat]
 *      parameters:
 *          -
 *              name : x-access-token
 *              in : header
 *              type : string
 *              required : true
 *      responses:
 *          200:
 *              description : the list of users.
 *              content :
 *                  application/json:
 *                      schema:
 *                          type : array
 *                          items :
 *                              #ref: '#/components/schemas/User'
 *          error:
 *                  description : something was wrong.
 */
router.get("/chat", authJwt.verifyToken, chatctrl.listparticipants);

export default router;
