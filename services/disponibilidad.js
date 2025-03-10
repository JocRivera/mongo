import Reserva from "../Schema/Reserva.js";
import Alojamiento from "../Schema/Alojamiento.js";

const getDisponibilidad = async (req, res) => {
    try {
        const { startDate, endDate, guests, id } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        // Consulta para encontrar reservas que se superpongan con el rango de fechas solicitado
        const reservedAccommodationsQuery = {
            $or: [
                {
                    startDate: { $lt: parsedEndDate }, // La fecha de inicio debe ser menor que la fecha de fin de la nueva reserva
                    endDate: { $gt: parsedStartDate }, // La fecha de fin debe ser mayor que la fecha de inicio de la nueva reserva
                },
            ],
        };

        // Si hay un ID de reserva, excluimos esa reserva de la consulta
        if (id) {
            reservedAccommodationsQuery._id = { $ne: id };
        }

        // Obtener los IDs de los alojamientos reservados
        const reservedAccommodations = await Reserva.find(reservedAccommodationsQuery).distinct('idAccommodation');

        // Consulta para encontrar alojamientos disponibles
        let query = {
            _id: { $nin: reservedAccommodations }
        };

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