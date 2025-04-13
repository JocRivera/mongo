import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from '../Config/Database.js';
import { alojamientoRoutes } from '../Routes/Alojamiento.routes.js';
import { reservaRoutes } from '../Routes/Reserva.routes.js';
import { disponibilidadRoutes } from '../Routes/Disponibilidad.routes.js';
import { servicioRoutes } from '../Routes/Servicio.routes.js';
import { acompananteRoutes } from '../Routes/Acompañante.routes.js';
import { clienteRoutes } from '../Routes/Cliente.routes.js';
import { planRoutes } from '../Routes/Plan.routes.js';
import { authRoutes } from '../Routes/Auth.routes.js';
import { verifyToken, verifyRol } from '../Middleware/Auth.js';
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        dotenv.config();
        this.app.use(cors({
            origin: 'http://localhost:5173', // solo tu frontend
            credentials: true               // permite enviar cookies
        }));;
        this.app.use(express.json());
        this.app.use(cookieParser());

        dbConnection();
    }

    routes() {
        this.app.use(authRoutes);
        // this.app.use((req, res, next) => {
        //     const publicRoutes = ['/register', '/login'];
        //     if (publicRoutes.includes(req.path)) {
        //         return next();
        //     }
        //     verifyToken(req, res, next);
        // })
        this.app.use(verifyToken);
        this.app.use(verifyRol(['admin', 'user']), planRoutes);
        this.app.use(verifyRol(['admin', 'user']), reservaRoutes);
        this.app.use(verifyRol(['admin', 'user']), disponibilidadRoutes);
        this.app.use(verifyRol(['admin']), alojamientoRoutes);
        this.app.use(verifyRol(['admin']), servicioRoutes);
        this.app.use(verifyRol(['admin']), acompananteRoutes);
        this.app.use(verifyRol(['admin']), clienteRoutes);
    }

    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
}

export { Server };