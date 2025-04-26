import { Schema, model } from 'mongoose';
const PlaneSchema = new Schema({
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
    capacidad: {
        type: Number,
        required: false,
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    idService: {
        type: [Schema.Types.ObjectId], ref: 'Servicio', required: false
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    },
    imagen: {
        type: String,  // URL o ruta a la imagen
        required: false,
    },
});

export default model('Plan', PlaneSchema);