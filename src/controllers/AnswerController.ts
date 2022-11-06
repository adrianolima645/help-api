import { Request, Response } from 'express';
import * as yup from 'yup';
import { Answer } from '../models/AnswerModel';

class AnswerController {

    async createAnswer(request: Request, response: Response) {
        const { 
            userId,
            questionId,
            answer,
            dateOfAnswer,
        } = request.body;

        const schema = yup.object().shape({
            userId: yup.string().required(),
            questionId: yup.string().required(),
            answer: yup.boolean().required(),
            dateOfAnswer: yup.date().required(),
         });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, message: error.message, details: error.errors});
        }
        
        const answerObj = new Answer({
            userId,
            questionId,
            answer,
            dateOfAnswer,
        });

        await answerObj.save();

        return response.status(200).json(answerObj);
    }

    async findByUserId(request: Request, response: Response) {
        const { userId } = request.params;

        const schema = yup.object().shape({
            userId: yup.string().required().min(24).matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, message: error.message, details: error.errors});
        }

        const query = { userId: userId };

        const result = await Answer.find(query);

        if (!result) {
            return response.status(400).json(result);
        }

        return response.status(200).json(result);
     }
    
}

export { AnswerController };