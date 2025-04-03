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
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    idRol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true,
        default: '67ee7889300c3f9328c8a4ba',
    },
}, { timestamps: true });

const User = model('User', UserSchema);
export default User;