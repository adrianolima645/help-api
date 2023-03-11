import { Request, Response } from 'express';
import { Question } from '../models/QuestionModel';
import * as yup from 'yup';

class QuestionController {

    async createQuestion(request: Request, response: Response) {
        const {description} = request.body;

        const schema = yup.object().shape({
            description: yup.string().required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const question = new Question({
            description,
        });

        await question.save();

        return response.status(200).json({description: "successful operation", schema: question});
    }

    async updateQuestion(request: Request, response: Response) {
        const { questionId } = request.params;
        const { 
            description,
        } = request.body;

        const schemaId = yup.object().shape({
            questionId: yup.string().required().min(24, "Id de questão invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        const schema = yup.object().shape({
            description: yup.string().required(),
        });

        try {
            await schemaId.validate(request.params, { abortEarly: false });
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const question = new Question({
            _id: questionId,
            description,
        });

        const query = { 
            _id: questionId,
            questionStatus: true,
        };
        const options = {
            new: false,
            upsert: false,
        };

        const result = await Question.findOneAndUpdate(query, question, options);

        if (!result) {
            return response.status(404).json({description: "Question not found!"});
        }

        const updatedQuestion = await Question.findOne({
            _id: questionId,
        });

        return response.status(200).json({description: "successful operation", schema: updatedQuestion});
    }

    async findByStatus(request: Request, response: Response) {

        const query = { 
            questionStatus: true,
        };

        const result = await Question.find(query);

        if (!result) {
            return response.status(404).json({description: "Question not found!"});
        }

        return response.status(200).json({description: "successful operation", schema: result});
    }

    async deleteQuestion(request: Request, response: Response) {
        const { questionId } = request.params;

        const schema = yup.object().shape({
            questionId: yup.string().required().min(24, "Id de questão invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const query = { 
            _id: questionId,
        };

        const options = {
            new: false,
            upsert: false,
        };

        const result = await Question.findOneAndDelete(query);

        if (!result) {
            return response.status(400).json(result);
        }

        return response.status(200).json({description: "successful operation", schema: result});
    }
    
}

export { QuestionController };