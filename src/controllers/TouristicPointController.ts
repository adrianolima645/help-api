import { Request, Response } from 'express';
import { isConditionalExpression } from 'typescript';
import * as yup from 'yup';
import { Category } from '../models/CategoryModel';
import { TouristicPoint } from '../models/TouristicPointModel';
import { User } from '../models/UserModel';

class TouristicPointController {

    async createTouristicPoint(request: Request, response: Response) {
        const { 
            category_id,
            user_id,
            name,
            about,
            website,
            facebook,
            instagram,
            youtube,
            whatsappNumber,
            phoneNumber,
            petFriendly,
            sponsored,
            pointStatus,
            openOnWeekends,
            openingHours,
            latitude,
            longitude
        } = request.body;

        const requestImages = request.files as Express.Multer.File[];
        const pictures = requestImages.map((image) => {
          return image;
        });

        const geolocation = {
            latitude,
            longitude
        };

        const data = {
            category_id,
            user_id,
            name,
            about,
            openingHours,
            pictures,
            geolocation,
            whatsappNumber,
            phoneNumber,
            petFriendly,
            pointStatus,
            sponsored,
            openOnWeekends,
        };

        const schema = yup.object().shape({
            category_id: yup.string().required().min(24).matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
            user_id: yup.string().required().min(24).matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
            name: yup.string().required(),
            about: yup.string().required(),
            openingHours: yup.string().required(),
            pictures: yup.array(
                yup.object().shape({
                    originalname: yup.string().required(),
                    location: yup.string().required(),
                    key: yup.string().required(),
                })
            ),
            geolocation: yup.object().shape({
                    latitude: yup.string().required(),
                    longitude: yup.string().required(),
            }),
            whatsappNumber: yup.string(),
            phoneNumber: yup.string(),
            petFriendly: yup.boolean(),
            pointStatus: yup.boolean(),
            sponsored: yup.boolean(),
            openOnWeekends: yup.boolean(),
        });

        try {
            await schema.validate(data, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }
        
        const touristicPoint = new TouristicPoint({
            category_id,
            user_id,
            name,
            about,
            website,
            facebook,
            instagram,
            youtube,
            whatsappNumber,
            phoneNumber,
            petFriendly,
            sponsored,
            pointStatus,
            openOnWeekends,
            openingHours,
            pictures,
            geolocation,
        });

        const category = await Category.findOne({
            id: category_id,
        });

        const user = await User.findOne({
            id: user_id,
        });
    
        if (!category) {
            return response.status(404).json({ message: 'Category not found!' });
        }

        if (!user) {
            return response.status(404).json({ message: 'User not found!' });
        }

        const result = await touristicPoint.save();
        return response.status(200).json({description: "successful operation", schema:result});
    }

    async findByStatus(request: Request, response: Response) {
        const { status } = request.params;

        const schema = yup.object().shape({
            status: yup.boolean().required(),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const touristicPoint = await TouristicPoint.find({
            pointStatus: status,
        });

        return response.status(200).json({description: "successful operation", schema:touristicPoint});
    }

    async findByCategory(request: Request, response: Response) {
        const { categoryId } = request.params;

        const schema = yup.object().shape({
            categoryId: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const category = await Category.findOne({
            _id: categoryId,
        });

        if (!category) {
            return response.status(404).json({ message: 'Category not found!' });
        }

        const touristicPoint = await TouristicPoint.find({
            category_id: categoryId,
            pointStatus: true,
        });

        if (!touristicPoint) {
            return response.status(404).json({message: "Touristic Point not found"});
        }

        return response.status(200).json({description: "successful operation", schema:touristicPoint});
    }

    async getTouristicPointById(request: Request, response: Response) {
        const { touristicPointId } = request.params;

        const schema = yup.object().shape({
            touristicPointId: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const touristicPoint = await TouristicPoint.findOne({
            _id: touristicPointId,
        });

        if (!touristicPoint) {
            return response.status(404).json({message: "Touristic Point not found"});
        }

        return response.status(200).json({description: "successful operation", schema:touristicPoint});
    }

    async updateTouristicPoint(request: Request, response: Response) {
        const { touristicPointId } = request.params;
        const { 
            category_id,
            user_id,
            name,
            about,
            website,
            facebook,
            instagram,
            youtube,
            whatsappNumber,
            phoneNumber,
            petFriendly,
            sponsored,
            pointStatus,
            openOnWeekends,
            openingHours,
            latitude,
            longitude
        } = request.body;

        let requestImages = [];
        requestImages = request.files as Express.Multer.File[];

        const pictures = requestImages.map((image) => {
            return image;
        });

        const geolocation = {
            latitude,
            longitude
        };

        const data = {
            category_id,
            user_id,
            name,
            about,
            openingHours,
            pictures,
            geolocation,
            whatsappNumber,
            phoneNumber,
            petFriendly,
            pointStatus,
            sponsored,
            openOnWeekends,
        };

        const schemaId = yup.object().shape({
            touristicPointId: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        const schema = yup.object().shape({
            category_id: yup.string().required().min(24).matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
            user_id: yup.string().required().min(24).matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
            name: yup.string().required(),
            about: yup.string().required(),
            openingHours: yup.string().required(),
            pictures: yup.array(
                yup.object().shape({
                    originalname: yup.string().required(),
                    location: yup.string().required(),
                    key: yup.string().required(),
                })
            ),
            geolocation: yup.object().shape({
                    latitude: yup.string().required(),
                    longitude: yup.string().required(),
            }),
            whatsappNumber: yup.string(),
            phoneNumber: yup.string(),
            petFriendly: yup.boolean(),
            pointStatus: yup.boolean(),
            sponsored: yup.boolean(),
            openOnWeekends: yup.boolean(),
        });

        try {
            await schemaId.validate(request.params, { abortEarly: false });
            await schema.validate(data, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const oldTouristicPoint = await TouristicPoint.findOne({_id: touristicPointId});
       
        const touristicPoint = {
            category_id,
            user_id,
            name,
            about,
            website,
            facebook,
            instagram,
            youtube,
            whatsappNumber,
            phoneNumber,
            petFriendly,
            sponsored,
            pointStatus,
            openOnWeekends,
            openingHours,
            pictures: [...oldTouristicPoint.pictures, ...pictures],
            geolocation,
        };

        const query = { 
            _id: touristicPointId,
         };

        const options = {
            new: false,
            upsert: false,
        };

        const result = await TouristicPoint.findOneAndUpdate(query, touristicPoint, options);

        if (!result) {
            return response.status(400).json(result);
        }

        return response.status(200).json({description: "successful operation", schema:result});
    }

    async deleteTouristicPoint(request: Request, response: Response) {
        const { touristicPointId } = request.params;

        const schemaId = yup.object().shape({
            touristicPointId: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

         try {
            await schemaId.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const query = { _id: touristicPointId };

        const result = await TouristicPoint.findOneAndDelete(query);

        if (!result) {
            return response.status(400).json(result);
        }
    
        return response.status(200).json({description: "successful operation", schema:result});
    }

    async uploadImage(request: Request, response: Response) {
        const requestImage = request.file;

        const {filename, path } = requestImage;

        const result = {
            'id': "tre98REF",
            'name': filename,
            'url': path,
        
        };
        return response.status(200).json({description: "successful operation", schema:result});
    }
    
}

export { TouristicPointController };