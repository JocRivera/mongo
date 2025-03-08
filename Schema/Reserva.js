import { Schema, model } from "mongoose";

const ReservaSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true,
    },
    idPlan: {
        type: Schema.Types.ObjectId, ref: 'Plan', required: true
    },
    idAccommodation: {
        type: Schema.Types.ObjectId, ref: 'Alojamiento', required: false
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    companion: [{
        type: Schema.Types.ObjectId,
        ref: 'Acompanante',
        required: false,
    }],
    status: {
        type: String,
        required: true,
        default: 'pendiente',
        enum: ['pendiente', 'confirmada', 'cancelada']
    },
});

export default model('Reserva', ReservaSchema);