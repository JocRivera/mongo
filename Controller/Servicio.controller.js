import Servicio from '../Schema/Servicio.js';

export class ServicioController {
    constructor() {
    }
    async getServicio(req, res) {
        try {
            const servicio = await Servicio.find()
            res.json(servicio);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async postServicio(req, res) {
        try {
            const servicio = new Servicio(req.body);
            await servicio.save();
            res.json(servicio);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async putServicio(req, res) {
        try {
            const { id } = req.params;
            await Servicio.updateOne({
                id:
                    id
            }, req.body);
            res.json({ message: 'Servicio actualizado' });
        }
        catch (error) {
            res.status(500).send
                (error);
        }
    }
    async deleteServicio(req, res) {
        try {
            const { id } = req.params;
            await Servicio.deleteOne({ id: id });
            res.json({ message: 'Servicio eliminado' });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

