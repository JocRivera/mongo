import Reserva from '../Schema/Reserva.js';

export class ReservaController {
    constructor() {
    }
    async getReserva(req, res) {
        try {
            const reserva = await Reserva.find()
                .populate('idAccommodation')
            res.json(reserva);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async postReserva(req, res) {
        try {
            const reserva = new Reserva(req.body);
            await reserva.save();
            res.json(reserva);
        } catch (error) {
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
