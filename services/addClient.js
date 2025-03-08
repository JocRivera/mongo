import Cliente from "../Schema/Cliente.js";
import Reserva from "../Schema/Reserva.js";
import Acompanante from "../Schema/Acompañantes.js";

async function addClient(req, res) {
    try {
        const { client, companion, reserva } = req.body;
        let data = await Cliente.findOne({ id: client.id });
        if (!data) {
            data = new Cliente(client);
            await data.save();
        }
        const companions = [];
        for (const acomp of companion) {
            let data = await Acompanante.findOne({ id: acomp.id });
            if (!data) {
                data = new Acompanante(acomp);
                await data.save();
            }
            companions.push(Acompanante._id);
        }
        const reservation = new Reserva({
            client: Cliente._id,
            companion: companions,
            ...reserva
        });
        await reservation.save();
        res.json(client);
    } catch (error) {
        res.status(500).send(error);
    }

}


export default addClient;