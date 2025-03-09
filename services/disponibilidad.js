import Reserva from "../Schema/Reserva.js";
import Alojamiento from "../Schema/Alojamiento.js";

const getDisponibilidad = async (req, res) => {
    try {
        const { startDate, endDate, guests } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        const reservedAccommodations = await Reserva.find({
            $or: [
                {
                    startDate: { $lte: parsedEndDate },
                    endDate: { $gte: parsedStartDate },
                },
            ],
        }).distinct('idAccommodation');

        let query = {
            _id: { $nin: reservedAccommodations }
        }

        if (guests) {
            query.capacidad = { $gte: guests };
        }

        const availableAccommodations = await Alojamiento.find(query);
        res.status(200).json(availableAccommodations);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("error en getDisponibilidad", error);
    }
}

export default getDisponibilidad;