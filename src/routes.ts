import { response, Router } from 'express';
import { AssessmentController } from './controllers/AssessmentController';
import { CategoryController } from './controllers/CategoryController';
import { QuestionController } from './controllers/QuestionController';
import { TouristicPointController } from './controllers/TouristicPointController';
import { UserController } from './controllers/UserController';
import multer from 'multer';
import uploadConfig from './config/upload';
import { AnswerController } from './controllers/AnswerController';

const router = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const categoryController = new CategoryController();
const questionController = new QuestionController();
const assessmentController = new AssessmentController();
const touristicPointController = new TouristicPointController();
const answerController = new AnswerController();

router.get('/', (request, response) => {
    return response.status(200).json({message:'HELLO WORLD HELP APP!!!'});
});

// user
router.post('/user', userController.createUser);
router.get('/user/login/:email/:password', userController.loginUser);
router.get('/user/logout', userController.logoutUser);
router.get('/user/:userId', userController.getUserByUserId);
router.put('/user/:userId', userController.updateUser);
router.delete('/user/:userId', userController.deleteUser);

// category
router.post('/category', categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);

// question
router.post('/question', questionController.createQuestion);
router.put('/question/:questionId', questionController.updateQuestion);
router.get('/question/findByStatus', questionController.findByStatus);
router.delete('/question/:questionId', questionController.deleteQuestion);

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
router.delete('/touristicPoint/:touristicPointId', touristicPointController.deleteTouristicPoint);

// picture
router.post('/touristicPoint/uploadImage', upload.single('image'), touristicPointController.uploadImage);


export { router };
