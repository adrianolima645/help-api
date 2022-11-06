import { Request, Response } from 'express';
import * as yup from 'yup';
import { Assessment } from '../models/AssessmentModel';

class AssessmentController {

    async createAssessment(request: Request, response: Response) {
        const { 
            userId,
            touristicPointId,
            description,
            rating,
            assessmentDate,
        } = request.body;

        const schema = yup.object().shape({
            userId: yup.string().required(),
            touristicPointId: yup.string().required(),
            description: yup.string().required().max(300),
            rating: yup.string().required(),
            assessmentDate: yup.date().required(),
         });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, message: error.message, details: error.errors});
        }
        
        const assessment = new Assessment({
            userId,
            touristicPointId,
            description,
            rating,
            assessmentDate,
        });

        await assessment.save();

        return response.status(200).json(assessment);
    }

    async findByTouristicPoint(request: Request, response: Response) {
        const { touristicPointId } = request.params;

        const schema = yup.object().shape({
            touristicPointId: yup.string().required().min(24).matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, message: error.message, details: error.errors});
        }

        const query = { touristicPointId: touristicPointId };
        
        const result = await Assessment.find(query);

        if (!result) {
            return response.status(400).json(result);
        }

        return response.status(200).json(result);
    }
    
}

export { AssessmentController };