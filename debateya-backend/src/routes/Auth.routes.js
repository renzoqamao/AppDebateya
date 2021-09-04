import { Router } from "express";
import * as authctrl from "../controllers/Auth.controller";
import { authJwt, verifySignup } from "../middlewares";
/**
 * @swagger
 * tags:
 *  name : Auth
 *  description : Users endpoint
 */

const router = Router();
/**
 * @swagger
 * /signup:
 *  post:
 *      summary: signup a user.
 *      tags: [Auth]
 *      requestBody :
 *          required : true
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      #ref : '#/components/schemas/User'
 *                  example :
 *                      name : Renzo
 *                      lastname : Quispe Amao
 *                      email : rrquispea@uni.pe
 *                      password : 123456
 *                      age : 20
 *                      gender : male
 *                      dni : 12345678
 *                      auth : false
 *      responses:
 *          200:
 *              description : Successful registration.
 *              content :
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/sucess'
 *
 *          error:
 *                  description : something was wrong.
 */
router.post(
  "/signup",
  [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  authctrl.signup
);
/**
 * @swagger
 * /signin:
 *  post :
 *      summary : a signin user to debateya.
 *      tags : [Auth]
 *      requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      $ref : '#/components/schemas/User'
 *                  example :
 *                      email : rrquispea@uni.pe
 *                      password : 123456
 *      responses :
 *              200 :
 *                  description : Successful signin.
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              $ref : '#/components/schemas/Usertoken'
 *                          example :
 *                              name : Renzo
 *                              lastname : Quispe Amao
 *                              email : rrquispea@uni.pe
 *                              password : sadas9d1j0131@rfkds9d21.128dad
 *                              age : 20
 *                              gender : male
 *                              dni : 12345678
 *                              auth : true
 *                              token : dsjxxz8124512465124412654@/320i32e5dsadda
 *              error:
 *                  description : something was wrong.
 */
router.post("/signin", authctrl.signin);
/**
 * @swagger
 * /signout:
 *  post :
 *      summary : a signin user to debateya.
 *      tags : [Auth]
 *      requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      $ref : '#/components/schemas/User'
 *                  example :
 *                      email : rrquispea@uni.pe
 *                      password : 123456
 *      responses :
 *              200 :
 *                  description : Successful signin.
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              properties :
 *                                  message :
 *                                      type : string
 *                          example :
 *                              message : user log out.
 *              error:
 *                  description : something was wrong.
 */
router.post("/signout", authctrl.signout);

export default router;
