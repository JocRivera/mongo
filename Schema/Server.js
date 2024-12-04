import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from '../Config/Database.js';
import { alojamientoRoutes } from '../routes/Alojamiento.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        dotenv.config();
        this.app.use(express.json());
        this.app.use(cors());
        dbConnection();
    }

    routes() {
        this.app.use(alojamientoRoutes);
    }

    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
}

export { Server };