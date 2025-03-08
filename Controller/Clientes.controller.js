import Cliente from '../Schema/Cliente.js';
export class ClienteController {
    constructor() {
    }
    async getCliente(req, res) {
        try {
            const cliente = await Cliente.find()
                .populate('idAccommodation')
            res.json(cliente);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async postCliente(req, res) {
        try {
            const cliente = new Cliente(req.body);
            await cliente.save();
            res.json(cliente);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async putCliente(req, res) {
        try {
            const { id } = req.params;
            await Cliente.updateOne({
                id:
                    id
            }, req.body);
            res.json({ message: 'Cliente actualizado' });
        }
        catch (error) {
            res.status(500).send
                (error);
        }
    }
    async deleteCliente(req, res) {
        try {
            const { id } = req.params;
            await Cliente.deleteOne({ id: id });
            res.json({ message: 'Cliente eliminado' });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}