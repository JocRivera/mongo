import ProgramarPlan from "../Schema/ProgramarPlan.js";

export class ProgramacionController {
    async getAll(req, res) {
        try {
            const programaciones = await ProgramarPlan.find().populate('idPlan');
            res.status(200).json(programaciones);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las programaciones", error });
        }
    }
    async create(req, res) {
        try {
            const { idPlan, fechaInicio, fechaFin } = req.body;
            const nuevaProgramacion = new ProgramarPlan({
                idPlan,
                fechaInicio,
                fechaFin
            });
            await nuevaProgramacion.save();
            res.status(201).json(nuevaProgramacion);
        } catch (error) {
            res.status(500).json({ message: "Error al crear la programación", error });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { idPlan, fechaInicio, fechaFin } = req.body;
            const programacionActualizada = await ProgramarPlan.findByIdAndUpdate(
                id,
                { idPlan, fechaInicio, fechaFin },
                { new: true }
            );
            if (!programacionActualizada) {
                return res.status(404).json({ message: "Programación no encontrada" });
            }
            res.status(200).json(programacionActualizada);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar la programación", error });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const programacionEliminada = await ProgramarPlan.findByIdAndDelete(id);
            if (!programacionEliminada) {
                return res.status(404).json({ message: "Programación no encontrada" });
            }
            res.status(200).json({ message: "Programación eliminada exitosamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la programación", error });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const programacion = await ProgramarPlan.findById(id).populate('idPlan');
            if (!programacion) {
                return res.status(404).json({ message: "Programación no encontrada" });
            }
            res.status(200).json(programacion);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener la programación", error });
        }
    }

}