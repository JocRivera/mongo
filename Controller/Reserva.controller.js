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

            let clientData;

            if (req.user.rol !== 'admin') {
                clientData = {
                    _id: userId,
                    nombre: userCompleto.nombre,
                    apellido: userCompleto.apellido,
                    documento: userCompleto.documento,
                    tipoDocumento: userCompleto.tipoDocumento,
                    email: userCompleto.email
                };
                reservaData.client = clientData;
            } else {
                clientData = reservaData.client; // El admin envía los datos del cliente
            }

            // Guardar cliente si no existe
            let clientDoc = await Cliente.findOne({ _id: clientData._id });
            if (!clientDoc) {
                clientDoc = new Cliente(clientData);
                await clientDoc.save();
            }

            // Procesar acompañantes
            const companionData = Array.isArray(reservaData.companion)
                ? reservaData.companion
                : reservaData.companion ? [reservaData.companion] : [];

            const companionIds = [];

            for (const acomp of companionData) {
                if (acomp && acomp.documento) {
                    let acompDoc = await Acompanante.findOne({ documento: acomp.documento });
                    if (!acompDoc) {
                        acompDoc = new Acompanante(acomp);
                        await acompDoc.save();
                    }
                    companionIds.push(acompDoc._id);
                }
            }

            // Crear nueva reserva
            const nuevaReserva = new Reserva({
                idPlan: reservaData.idPlan,
                idAccommodation: reservaData.idAccommodation,
                startDate: reservaData.startDate,
                endDate: reservaData.endDate,
                companion: companionIds,
                status: reservaData.status || 'pendiente',
                client: clientDoc._id,
                user: userId
            });

            await nuevaReserva.save();

            // Notificar a admins
            const io = getIO();
            io.to('admin_room').emit('notification', {
                message: 'Nueva reserva registrada',
                reservaId: nuevaReserva._id
            });

            res.status(201).json(nuevaReserva);

        } catch (error) {
            console.error('Error al guardar la reserva:', error);
            res.status(500).json({ message: 'Error al procesar la reserva', error });
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
