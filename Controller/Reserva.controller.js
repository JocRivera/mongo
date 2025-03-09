import Reserva from '../Schema/Reserva.js';
import Cliente from "../Schema/Cliente.js";
import Acompanante from "../Schema/Acompañantes.js";
export class ReservaController {
    constructor() {
    }
    async getReserva(req, res) {
        try {
            const reserva = await Reserva.find()
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
            const reservaData = req.body;

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
