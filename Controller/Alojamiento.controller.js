import Alojamiento from '../Schema/Alojamiento.js';

const getAlojamiento = async (req, res) => {
    const alojamiento = await Alojamiento.find();
    res.json(alojamiento);
}

const postAlojamiento = async (req, res) => {
    const alojamiento = new Alojamiento(req.body);
    await alojamiento.save();
    res.json(alojamiento);
}

const putAlojamiento = async (req, res) => {
    try {
        const { id } = req.params; // Destructuring
        const alojamiento = req.body;
        const alojamientoUpdated = await Alojamiento.findByIdAndUpdate
            (id, alojamiento, { new: true });
        res.json(alojamientoUpdated);
    } catch (error) {
        res.json(error);
    }
}

const deleteAlojamiento = async (req, res) => {
    try {
        const { id } = req.params;
        await Alojamiento.findByIdAndDelete(id);
        res.json({ message: 'Alojamiento deleted' });
    } catch (error) {
        res.json(error);
    }
}

export { getAlojamiento, postAlojamiento, putAlojamiento, deleteAlojamiento };