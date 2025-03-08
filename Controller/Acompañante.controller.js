import Acompanantes from '../Schema/Acompañantes.js'

export class AcompananteController {
    constructor() {
    }
    async getAcompanante(req, res) {
        try {
            const acompanante = await Acompanantes.find()
            res.json(acompanante);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async postAcompanante(req, res) {
        try {
            const acompanante = new Acompanantes(req.body);
            await acompanante.save();
            res.json(acompanante);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async putAcompanante(req, res) {
        try {
            const { id } = req.params;
            await Acompanantes.updateOne({
                id:
                    id
            }, req.body);
            res.json({ message: 'Acompanante actualizado' });
        }
        catch (error) {
            res.status(500).send
                (error);
        }
    }
    async deleteAcompanante(req, res) {
        try {
            const { id } = req.params;
            await Acompanantes.deleteOne({ id: id });
            res.json({ message: 'Acompanante eliminado' });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}


