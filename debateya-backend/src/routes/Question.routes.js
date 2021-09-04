import { Router } from "express";
import * as questionctrl from "../controllers/Question.controller";
import { authJwt } from "../middlewares";

/**
 * @swagger
 * tags:
 *  name : Questions
 *  description : Users endpoint
 * parameters :
 *  questionId :
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
 * /question:
 *  get:
 *      summary: Returns a list of question..
 *      tags: [Questions]
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
router.get("/question", [authJwt.verifyToken], questionctrl.list);

/**
 * @swagger
 * /question/method/add:
 *  post:
 *      summary: add question.
 *      tags: [Questions]
 *      parameters:
 *          -
 *              name : x-access-token
 *              in : header
 *              type : string
 *              required : true
 *      requestBody :
 *          required : true
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      #ref : '#/components/schemas/Question'
 *                  example :
 *                      user : userid
 *                      title : pregunta 1
 *                      nchange : 4
 *                      description : description of question 1
 *                      options : [yes, no, maybe]
 *      responses:
 *          200:
 *              description : Successful add.
 *              content :
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/sucess'
 *
 *          error:
 *                  description : something was wrong.
 */
router.post("/question/method/add", [authJwt.verifyToken], questionctrl.add);
/**
 * @swagger
 * /question/method/find/{id}:
 *  get :
 *      summary : get a question by Id
 *      tags : [Questions]
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
 *                  description : Question Found
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              $ref : '#/components/schemas/Question'
 *                          example :
 *                              user : userid
 *                              title : title's question
 *                              description : description of question
 *                              nchange : 5
 *                              listvoters : [votantes]
 *                              options : [yes, no , maybe]
 *                              creation : Date
 *                              expires : Date
 *                              data : [0,0,0]
 *              error:
 *                  description : something was wrong.
 */
router.get(
  "/question/method/find/:id",
  [authJwt.verifyToken],
  questionctrl.findbyid
);
/**
 * @swagger
 * /user/method/find/{questionid}/{userid}:
 *  get :
 *      summary : get a number of changes left.
 *      tags : [Question]
 *      parameters:
 *          -
 *              name : x-access-token
 *              in : header
 *              type : string
 *              required : true
 *          - userid:
 *              $ref : '#/components/parameters/userId'
 *          - questionid :
 *              $ref : '#/components/parameters/questionId'
 *      responses :
 *              200 :
 *                  description : Get changes left.
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              properties :
 *                                  nchanges :
 *                                      type : integer
 *                          example :
 *                              nchanges : 5
 *              error:
 *                  description : something was wrong.
 */
router.get(
  "/question/method/find/:question_id/:voter_id",
  [authJwt.verifyToken],
  questionctrl.get_changes_voter
);

/**
 * @swagger
 * /question/method/update/addvoter/{id}:
 *  put:
 *      summary : Add o modify  a voter.
 *      tags : [Question]
 *      parameters:
 *          -
 *              name : x-access-token
 *              in : header
 *              type : string
 *              required : true
 *          - id:
 *              $ref : '#/components/parameters/questionId'
 *      requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      $ref : '#/components/schemas/Voter'
 *                  example :
 *                      id : voterid
 *                      option : yes
 *                      nchanges: 5
 *      responses :
 *              200 :
 *                  description : question Updated voter.
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              properties:
 *                                  message:
 *                                      type : string
 *                          example :
 *                              message :  successfully.
 *              error:
 *                  description : something was wrong.
 */
router.put(
  "/question/method/update/addvoter/:id",
  [authJwt.verifyToken],
  questionctrl.addvoter
);

/**
 * @swagger
 * /question/method/delete/{id}:
 *  delete :
 *      summary : delete question by Id
 *      tags : [Questions]
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
 *                  description : Question deleted.
 *                  content :
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              properties :
 *                                  message :
 *                                      type : string
 *                          example :
 *                              message : question with {id} has been deleted.
 *              error:
 *                  description : something was wrong.
 */
router.delete(
  "/question/method/delete/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  questionctrl.deletebyid
);

export default router;
