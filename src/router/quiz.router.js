import express from 'express'
import quizController from '../controller/quiz.controller.js';

const quizRouter = express.Router()

quizRouter.post('/quiz-info', quizController.quizInfo);
quizRouter.get('/quiz-list', quizController.quizAll);
  
export default quizRouter