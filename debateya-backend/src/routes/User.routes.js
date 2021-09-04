import { Router } from "express";
import * as userctrl from "../controllers/User.controller";
import { authJwt, verifySignup } from "../middlewares";

/**
 * @swagger
 * components :
 *  schemas :
 *      sucess:
 *          type : object
 *          properties :
 *              message :
 *                  type : string
 *                  description : A message 'done' for sucess work.
 *          example :
 *              message : Done
 * parameters :
 *  userId :
 *      in : path
 *      name : id
 *      required : true
 *      schema :
 *          type : string
 *      description : the user id.
 */
const router = Router();
/**
 * @swagger
 * tags:
 *  name : Users
 *  description : Users endpoint
 */

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Returns a list of users.
 *      tags: [Users]
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
 *                          list:
 *                              type : array
 *                              items :
 *                                  #ref: '#/components/schemas/User'
 *          error:
 *                  description : something was wrong.
 */
router.get("/user", [authJwt.verifyToken], userctrl.list);
/**
 * @swagger
 * /user/method/signup:
 *  post:
 *      summary: signup a user.
 *      tags: [Users]
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
  "/user/method/signup",
  [verifySignup.checkDuplicateUsernameOrEmail],
  userctrl.signup
);
/**
 * @swagger
 * /user/method/signin:
 *  post :
 *      summary : a signin user to debateya.
 *      tags : [Users]
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
router.post("/user/method/signin", userctrl.signin);
/**
 * @swagger
 * /user/method/find/{id}:
 *  get :
 *      summary : get a user by Id
 *      tags : [Users]
 *      parameters:
 *          -
 *              name : x-access-token
 *              in : header
 *              type : string
 *              required : true
 *          - id:
 *              $ref : '#/components/parameters/userId'
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
 *                  description : User Found
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              $ref : '#/components/schemas/User'
 *                          example :
 *                              name : Renzo
 *                              lastname : Quispe Amao
 *                              email : rrquispea@uni.pe
 *                              password : sadas9d1j0131@rfkds9d21.128dad
 *                              age : 20
 *                              gender : male
 *                              dni : 12345678
 *                              auth : true
 *              error:
 *                  description : something was wrong.
 */
router.get("/user/method/find/:id", [authJwt.verifyToken], userctrl.findbyid);

/**
 * @swagger
 * /user/method/update/{id}:
 *  put:
 *      summary : Update a user by id.
 *      tags : [Users]
 *      parameters:
 *          -
 *              name : x-access-token
 *              in : header
 *              type : string
 *              required : true
 *          - id:
 *              $ref : '#/components/parameters/userId'
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
 *                  description : User Updated
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              properties:
 *                                  message:
 *                                      type : string
 *                          example :
 *                              message :  user with {id} has been updated.
 *              error:
 *                  description : something was wrong.
 */
router.put(
  "/user/method/update/:id",
  [authJwt.verifyToken],
  userctrl.updatebyid
);
/**
 * @swagger
 * /user/method/delete/{id}:
 *  delete:
 *      summary : delete a user by id.
 *      tags : [Users]
 *      parameters:
 *          -
 *              name : x-access-token
 *              in : header
 *              type : string
 *              required : true
 *          - id:
 *              $ref : '#/components/parameters/userId'
 *      responses :
 *              200 :
 *                  description : User Updated
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              properties:
 *                                  message:
 *                                      type : string
 *                          example :
 *                              message :  user with {id} has been deleted.
 *              error:
 *                  description : something was wrong.
 */
router.delete(
  "/user/method/delete/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  userctrl.deletebyid
);
/* delete all user - Only Admistrator */
router.delete(
  "/user/method/delete",
  [authJwt.verifyToken, authJwt.isAdmin],
  userctrl.deleteall
);
export default router;
