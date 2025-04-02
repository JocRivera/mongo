import { Schema, model } from 'mongoose';

const RolSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    permisos: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

export default model('Rol', RolSchema);
