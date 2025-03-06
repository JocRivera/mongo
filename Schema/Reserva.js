import { Schema, model } from "mongoose";
const ReservaSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    idClient: {
        type: Number,
        required: true,
    },
    idPlain: {
        type: Number,
        required: true,
    },
    idAccommodation: {
        type: Schema.Types.ObjectId, ref: 'Alojamiento', required: false
    },
    initDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    idCompanion: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: 'pendiente',
        enum: ['pendiente', 'confirmada', 'cancelada']
    },
});

export default model('Reserva', ReservaSchema);