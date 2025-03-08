import { Schema, model } from 'mongoose';
const AcompanantesSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    documento: {
        type: String,
        required: true,
    },
    tipoDocumento: {
        type: String,
        required: true,
        enum: ['cedula', 'pasaporte', 'otro']
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    eps: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['activo', 'inactivo']
    },
});

export default model('Acompanante', AcompanantesSchema);
