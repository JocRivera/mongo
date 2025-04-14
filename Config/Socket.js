import { Server as SocketServer } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

export const initializeSocket = (server) => {
    io = new SocketServer(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        const token = socket.handshake.auth.token;

        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                if (decoded.rol === 'admin') {
                    socket.join('admin_room');
                    console.log(`Admin ${decoded.id} se unió a la sala admin-room`);
                }
            }
        } catch (err) {
            console.error('Error al verificar token del socket:', err.message);
        }

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
