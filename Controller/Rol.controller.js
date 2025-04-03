import Rol from "../Schema/Rol.js";

export class RolController {
    constructor() {
    }
    async getRol(req, res) {
        try {
            const rol = await Rol.find();
            res.json(rol);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async postRol(req, res) {
        try {
            const rolData = req.body;
            const newRol = new Rol(rolData);
            await newRol.save();
            res.status(201).json(newRol);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async putRol(req, res) {
        const { id } = req.params;
        await Rol.updateOne({
            _id: id
        }, req.body);
        res.json({ message: 'Rol actualizado' });
    }
    async deleteRol(req, res) {
        try {
            const { id } = req.params;
            await Rol.deleteOne({ _id: id });
            res.json({ message: 'Rol eliminado' });
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async getRolById(req, res) {
        try {
            const { id } = req.params;
            const rol = await Rol.findById(id);
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.json(rol);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
