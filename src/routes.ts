import { Router } from 'express';
import { AssessmentController } from './controllers/AssessmentController';
import { CategoryController } from './controllers/CategoryController';
import { QuestionController } from './controllers/QuestionController';
import { TouristicPointController } from './controllers/TouristicPointController';
import { UserController } from './controllers/UserController';
import multer from 'multer';
import uploadConfig from './config/upload';
import { AnswerController } from './controllers/AnswerController';
import jwt from 'jsonwebtoken';

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
router.get('/user/:userId', checkToken, userController.getUserByUserId);
router.put('/user/:userId', checkToken, userController.updateUser);
router.delete('/user/:userId', checkToken, userController.deleteUser);

// category
router.post('/category', checkToken, categoryController.createCategory);
router.get('/category', checkToken, categoryController.getAllCategories);

// question
router.post('/question', checkToken, questionController.createQuestion);
router.put('/question/:questionId', checkToken, questionController.updateQuestion);
router.get('/question/findByStatus', checkToken, questionController.findByStatus);
router.delete('/question/:questionId', checkToken, questionController.deleteQuestion);

// answer
router.post('/answer', checkToken, answerController.createAnswer);
router.get('/answer/findByUserId/:userId', checkToken, answerController.findByUserId);

// assessment
router.post('/assessment', checkToken, assessmentController.createAssessment);
router.get('/assessment/findByTouristicPoint/:touristicPointId', checkToken, assessmentController.findByTouristicPoint);

// touristic point
router.post('/touristicPoint', upload.array('images'), checkToken, touristicPointController.createTouristicPoint);
router.get('/touristicPoint/findByStatus/:status', checkToken, touristicPointController.findByStatus);
router.get('/touristicPoint/findByCategory/:categoryId', checkToken, touristicPointController.findByCategory);
router.get('/touristicPoint/:touristicPointId', checkToken, touristicPointController.getTouristicPointById);
router.post('/touristicPoint/:touristicPointId',upload.array('images'), checkToken, touristicPointController.updateTouristicPoint);
router.delete('/touristicPoint/:touristicPointId', checkToken, touristicPointController.deleteTouristicPoint);

// picture
router.post('/touristicPoint/uploadImage', upload.single('image'), touristicPointController.uploadImage);

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Acesso Negado!"})
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();        
    } catch (error) {
        return res.status(400).json({message: "Token inválido!"})
    }
}

export { router };
