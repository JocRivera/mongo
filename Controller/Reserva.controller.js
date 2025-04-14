import Reserva from '../Schema/Reserva.js';
import Cliente from "../Schema/Cliente.js";
import Acompanante from "../Schema/Acompañantes.js";
import User from "../Schema/User.js";
import { getIO } from '../Config/Socket.js';
export class ReservaController {
    constructor() {
    }
    async getReserva(req, res) {
        try {
            // Obtener el rol del usuario desde el token (asumiendo que está en req.user)
            const userRole = req.user.rol;
            const userId = req.user.id;

            let query = {};

            // Si no es admin, filtrar solo las reservas del usuario
            if (userRole !== 'admin') {
                query.client = userId;
            }

            const reserva = await Reserva.find(query)
                .populate('idAccommodation')
                .populate('idPlan')
                .populate('client')
                .populate('companion');

            res.json(reserva);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async postReserva(req, res) {
        try {
            console.log('Datos del usuario desde el token:', req.user);

            const reservaData = req.body;
            const userId = req.user.id;

            reservaData.user = userId;

            const userCompleto = await User.findById(userId);
            if (!userCompleto) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (req.user.rol === 'admin') {
                reservaData.client = {
                    _id: userId,
                    nombre: userCompleto.nombre,
                    apellido: userCompleto.apellido,
                    documento: userCompleto.documento,
                    tipoDocumento: userCompleto.tipoDocumento,
                    email: userCompleto.email
                };
            }

            const nuevaReserva = new Reserva(reservaData);
            await nuevaReserva.save();

            // ⚡ Emitir notificación a admins
            const io = getIO();
            io.to('admin_room').emit('notification', {
                message: 'Nueva reserva registrada',
                reservaId: nuevaReserva._id
            });

            res.status(201).json(nuevaReserva);
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
            res.status(500).send({ message: 'Error al crear la reserva', error });
        }
    }

    async putReserva(req, res) {
        try {
            const { id } = req.params;
            await Reserva.updateOne({
                id:
                    id
            }, req.body);
            res.json({ message: 'Reserva actualizada' });
        }
        catch (error) {
            res.status(500).send
                (error);
        }
    }
    async deleteReserva(req, res) {
        try {
            const { id } = req.params;
            await Reserva.deleteOne({ id: id });
            res.json({ message: 'Reserva eliminada' });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}
