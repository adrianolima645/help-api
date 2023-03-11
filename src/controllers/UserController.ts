import { Request, Response } from 'express';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/UserModel';

class UserController {

    async createUser(request: Request, response: Response) {
        const { 
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            phone,
            city,
            state,
            userType,
            termsOfUse 
        } = request.body;

        const schema = yup.object().shape({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            dateOfBirth: yup.date().required(),
            phone: yup.string().required().min(10, "Número de telefone inválido!"),
            city: yup.string().required(),
            state: yup.string().required().max(2, "Estado deve ter somente dois caracteres!"),
            userType: yup.string().required(),
            userStatus: yup.boolean().required(),
            termsOfUse: yup.boolean().required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            dateOfBirth,
            phone,
            city,
            state,
            userType,
            termsOfUse
        });

        const userAlreadyExists = await User.findOne({
            email,
        });
    
        if (userAlreadyExists) {
            return response.status(401).json({ message: 'User already exists!' });
        }

        const result = await user.save();

        return response.status(200).json({description: "successful operation", schema:result});
    }

    async deleteUser(request: Request, response: Response) {
        const { userId } = request.params;

        const schema = yup.object().shape({
            userId: yup.string().required().min(24, "Id de usuário invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const user = new User({
            _id: userId,
            userStatus:false,
        });

        const query = { _id: userId };
        const options = {
            new: false,
            upsert: false,
        };

        const result = await User.findOneAndUpdate(query, user, options);

        if (!result) {
            return response.status(400).json(result);
        }

        return response.status(200).json({description: "successful operation", schema:result});
    }

    async getUserByUserId(request: Request, response: Response) {
        const { userId } = request.params;

        const schema = yup.object().shape({
            userId: yup.string().required().min(24, "Id de usuário invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const user = await User.findOne({
            _id: userId,
            userStatus: true,
        }, '-password');

        if (!user) {
            return response.status(404).json({message: "User not found"});
        }

        return response.status(200).json({description: "successful operation", schema:user});
    }

    async loginUser(request: Request, response: Response) {
        const { email, password } = request.params;
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        });

        try {
            await schema.validate(request.params, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const result = await User.findOne({
            email
        });

        if (!result) {
            return response.status(404).json({message: "User not found"});
        }

        try {
            const passwordHash = await bcrypt.compare(password, result.password);

            if (!passwordHash) {
                return response.status(400).json({message: "Senha inválida!"});
            }

            const secret = process.env.SECRET;

            const token = jwt.sign({
                id:result._id,
            }, secret)

            return response.status(200).json({message: "successful operation", schema: result, token: token});
        } catch (error) {
            return response.status(500).json({ type: error.name, description: error.message, details: error.errors});
        }
    }

    async logoutUser(request: Request, response: Response) {
         return response.json({message: "successful operation"});
    }

    async updateUser(request: Request, response: Response) {
        const { userId } = request.params;
        const { 
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            phone,
            city,
            state,
            userType,
            userStatus,
            termsOfUse 
        } = request.body;

        const schemaId = yup.object().shape({
            userId: yup.string().required().min(24).matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
        });

        const schema = yup.object().shape({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            dateOfBirth: yup.date().required(),
            phone: yup.string().required().min(10, "Número de telefone inválido!"),
            city: yup.string().required(),
            state: yup.string().required().max(2, "Estado deve ter somente dois caracteres!"),
            userType: yup.string().required(),
            userStatus: yup.boolean().required(),
            termsOfUse: yup.boolean().required(),
        });

        try {
            await schemaId.validate(request.params, { abortEarly: false });
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ type: error.name, description: error.message, details: error.errors});
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            _id: userId,
            firstName,
            lastName,
            email,
            password: passwordHash,
            dateOfBirth,
            phone,
            city,
            state,
            userType,
            userStatus,
            termsOfUse
        });

        const query = { 
            _id: userId,
            userStatus: true,
        };
        const options = {
            new: false,
            upsert: false,
        };

        const result = await User.findOneAndUpdate(query, user, options);

        if (!result) {
            return response.status(400).json(result);
        }

        const updatedUser = await User.findOne({
            _id: userId,
        }, '-password');

        return response.status(200).json({description: "successful operation", schema:updatedUser});
    }
}

export {UserController};