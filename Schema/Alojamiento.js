import { Schema, model } from "mongoose";
const AlojamientoSchema = new Schema({
    idAlojamiento: {
        type: Number,
        required: true,
        unique: true,
    },
    capacidad: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
        enum: ['cabaña', 'habitacion']
    },
    comodidad: {
        type: [String],
        required: true,
    },
    estado: {
        type: String,
        required: true,
        enum: ['disponible', 'ocupado', 'mantenimiento']
    },
    images: {
        type: [String],
        required: true,
    },
});

export default model('Alojamiento', AlojamientoSchema);