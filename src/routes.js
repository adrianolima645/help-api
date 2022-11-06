"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var AssessmentController_1 = require("./controllers/AssessmentController");
var CategoryController_1 = require("./controllers/CategoryController");
var QuestionController_1 = require("./controllers/QuestionController");
var TouristicPointController_1 = require("./controllers/TouristicPointController");
var UserController_1 = require("./controllers/UserController");
var multer_1 = require("multer");
var upload_1 = require("./config/upload");
var AnswerController_1 = require("./controllers/AnswerController");
var router = (0, express_1.Router)();
exports.router = router;
var upload = (0, multer_1["default"])(upload_1["default"]);
var userController = new UserController_1.UserController();
var categoryController = new CategoryController_1.CategoryController();
var questionController = new QuestionController_1.QuestionController();
var assessmentController = new AssessmentController_1.AssessmentController();
var touristicPointController = new TouristicPointController_1.TouristicPointController();
var answerController = new AnswerController_1.AnswerController();
router.get('/', function (request, response) {
    return response.status(200).json({ message: 'HELLO WORLD HELP APP!!!' });
});
// user
router.post('/user', userController.createUser);
router.get('/user/login/:email/:password', userController.loginUser);
router.get('/user/logout', userController.logoutUser);
router.get('/user/:userId', userController.getUserByUserId);
router.put('/user/:userId', userController.updateUser);
router["delete"]('/user/:userId', userController.deleteUser);
// category
router.post('/category', categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);
// question
router.post('/question', questionController.createQuestion);
router.put('/question/:questionId', questionController.updateQuestion);
router.get('/question/findByStatus', questionController.findByStatus);
router["delete"]('/question/:questionId', questionController.deleteQuestion);
// answer
router.post('/answer', answerController.createAnswer);
router.get('/answer/findByUserId/:userId', answerController.findByUserId);
// assessment
router.post('/assessment', assessmentController.createAssessment);
router.get('/assessment/findByTouristicPoint/:touristicPointId', assessmentController.findByTouristicPoint);
// touristic point
router.post('/touristicPoint', upload.array('images'), touristicPointController.createTouristicPoint);
router.get('/touristicPoint/findByStatus/:status', touristicPointController.findByStatus);
router.get('/touristicPoint/findByCategory/:categoryId', touristicPointController.findByCategory);
router.get('/touristicPoint/:touristicPointId', touristicPointController.getTouristicPointById);
router.put('/touristicPoint/:touristicPointId', touristicPointController.updateTouristicPoint);
router["delete"]('/touristicPoint/:touristicPointId', touristicPointController.deleteTouristicPoint);
// picture
router.post('/touristicPoint/uploadImage', upload.single('image'), touristicPointController.uploadImage);
