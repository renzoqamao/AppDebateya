import { Router } from "express";
import * as dashboardctrl from "../controllers/Dashboard.controller";
import { authJwt } from "../middlewares";
const router = Router();
/* Computer the stadistics 
return a list of diccionary with data and label (options)*/

/**
 * @swagger
 * components:
 *  parameters:
 *      limitParam:
 *          name : limit
 *          in : query
 *          description : number of results to be obtained.
 *          example : 3
 *          schema :
 *              type : integer
 *
 *      skipParam :
 *          name : skip
 *          in : query
 *          description : number of results to start from.
 *          example : 0
 *          schema :
 *              type : integer
 *
 * */

/**
 * @swagger
 * tags:
 *  name : Dashboard
 *  description : Users endpoint
 */

/**
 * @swagger
 * /dashboard:
 *  get:
 *      summary: Returns a list of question..
 *      tags: [Dashboard]
 *      parameters:
 *          -
 *              name : x-access-token
 *              in : header
 *              type : string
 *              required : true
 *          - $ref : '#/components/parameters/limitParam'
 *          - $ref : '#/components/parameters/skipParam'
 *      responses:
 *          200:
 *              description : the list of question.
 *              content :
 *                  application/json:
 *                      schema:
 *                          list:
 *                              type : array
 *                              items :
 *                                  #ref: '#/components/schemas/Question'
 *                          count:
 *                              type : integer
 *          error:
 *                  description : something was wrong.
 */
router.get("/dashboard", authJwt.verifyToken, dashboardctrl.data);

export default router;
