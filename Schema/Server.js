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
import { initializeSocket } from '../Config/Socket.js';
import { createServer } from 'http';
import User from './User.js';
import jwt from 'jsonwebtoken';  // Si no lo tienes importado

class Server {
    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.io = initializeSocket(this.server);
        this.config();
        this.routes();
        this.socketEvents();
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
    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('New client connected', socket.id);

            // Unirse a la sala de admin si el usuario es admin
            socket.on('join_admin_room', async (token) => {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    const userId = decoded.id; // Obtener el userId decodificado

                    // Verificar si el usuario es admin
                    const user = await User.findById(userId);
                    console.log('Usuario encontrado:', user);

                    if (user && user.rol === 'admin') {
                        socket.join('admin_room');
                        console.log(`Admin ${userId} joined notification room`);

                        // Enviar confirmación al cliente
                        socket.emit('admin_room_joined', {
                            success: true,
                            message: 'Conectado para recibir notificaciones de reservas'
                        });
                    } else {
                        console.log(`Usuario ${userId} intentó unirse a sala de admin sin permisos`);
                        socket.emit('admin_room_joined', {
                            success: false,
                            message: 'No tienes permisos para recibir notificaciones de admin'
                        });
                    }
                } catch (error) {
                    console.error('Error al unir usuario a sala de admin:', error);
                    socket.emit('admin_room_joined', {
                        success: false,
                        message: 'Error de autenticación'
                    });
                }
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected', socket.id);
            });
        });
    }
    start() {
        this.server.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT} with Socket.IO enabled`);
        });
    }
}

export { Server };