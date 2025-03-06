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
    idPlan: {
        type: Number,
        required: true,
    },
    idAlojamiento: {
        type: Schema.Types.ObjectId, ref: 'Alojamiento', required: false
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFin: {
        type: Date,
        required: true,
    },
    idAcompañante: {
        type: Number,
        required: false,
    },
    estado: {
        type: String,
        required: true,
        default: 'pendiente',
        enum: ['pendiente', 'confirmada', 'cancelada']
    },
});

export default model('Reserva', ReservaSchema);