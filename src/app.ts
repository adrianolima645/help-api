import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { router } from './routes';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import {connection} from './models/index';

import swaggerDocs from './swagger.json';
import { AppError } from './errors/AppError';

const app = express();

const corsOptions: cors.CorsOptions = {
    methods: "GET,POST,OPTIONS,PUT,DELETE",
    origin: "*",
    allowedHeaders: "*",
}

app.use(cors(corsOptions));

if (connection) {
  console.log("DB IS CONNECTED");
}

app.use(express.json());

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'Error',
      message: `Internal server error ${err.message}`,
    });
  }
);

export default app;