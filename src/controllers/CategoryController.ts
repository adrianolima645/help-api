import { Request, Response } from 'express';
import { Category } from '../models/CategoryModel';
import * as yup from 'yup';

class CategoryController {

    async createCategory(request: Request, response: Response) {
        const {title} = request.body;

        const schema = yup.object().shape({
            title: yup.string().required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, message: error.message, details: error.errors});
        }

        const category = new Category({
            title: title
        });

        await category.save();

        return response.status(200).json({description: "successful operation", schema: category});
    }

    async getAllCategories(request: Request, response: Response) {

        const result = await Category.find({});

        return response.status(200).json({description: "successful operation", schema: result});
    }

}

export { CategoryController };