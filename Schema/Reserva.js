import { Schema, model } from "mongoose";
const ReservaSchema = new Schema({
    idReserva: {
        type: Number,
        required: true,
        unique: true,
    },
    idCliente: {
        type: Number,
        required: true,
    },
    plan: {
        type: Number,
        required: true,
    },
    alojamiento: {
        type: String,
        required: false,
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFin: {
        type: Date,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        default: 'pendiente',
        enum: ['pendiente', 'confirmada', 'cancelada']
    },
});

export default model('Reserva', ReservaSchema);