import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
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
        enum: ['cc', 'ce', 'pp'],
    },
    telefono: {
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    eps: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
}, { timestamps: true });

const User = model('User', UserSchema);
export default User;