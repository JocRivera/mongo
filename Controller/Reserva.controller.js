import Reserva from '../Schema/Reserva.js';
import Cliente from "../Schema/Cliente.js";
import Acompanante from "../Schema/Acompañantes.js";
import User from "../Schema/User.js";
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
            const userId = req.user.id; // Obtener el ID del usuario desde el token
            reservaData.user = userId; // Asignar el ID del usuario a la reserva
            // Buscar el usuario completo en la base de datos para asegurar datos completos
            const userCompleto = await User.findById(userId);
            if (!userCompleto) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (req.user.rol !== 'admin') {
                reservaData.client = {
                    _id: userId,
                    nombre: userCompleto.nombre,
                    apellido: userCompleto.apellido,
                    documento: userCompleto.documento,
                    tipoDocumento: userCompleto.tipoDocumento,
                    email: userCompleto.email,
                    telefono: userCompleto.telefono,
                    eps: userCompleto.eps,
                    status: 'activo' // Agregar status por defecto
                };
            } else if (!reservaData.client || !reservaData.client.status) {
                // Si es admin pero no envió todos los datos del cliente
                if (!reservaData.client) reservaData.client = {};
                reservaData.client.status = 'activo';
            }

            // Extraer datos del cliente
            const clientData = reservaData.client;

            // Extraer datos del acompañante (convertir a array si es un solo objeto)
            const companionData = Array.isArray(reservaData.companion)
                ? reservaData.companion
                : [reservaData.companion];

            // Procesar cliente
            let clientDoc = await Cliente.findOne({ _id: clientData._id });
            if (!clientDoc) {
                clientDoc = new Cliente(clientData);
                await clientDoc.save();
            }

            // Procesar acompañantes
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
            const newReserva = new Reserva({
                user: userId,
                id: reservaData._id,
                client: clientDoc._id,
                idPlan: reservaData.idPlan,
                idAccommodation: reservaData.idAccommodation,
                startDate: reservaData.startDate,
                endDate: reservaData.endDate,
                companion: companionIds,
                status: reservaData.status || 'pendiente'
            });

            await newReserva.save();

            res.json(newReserva);
        } catch (error) {
            console.error("Error al crear reserva:", error);
            res.status(500).send(error);
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
