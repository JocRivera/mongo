import { Schema, model } from "mongoose";
const ServicioSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        enum: ['disponible', 'ocupado', 'mantenimiento']
    },
});

export default model('Servicio', ServicioSchema);