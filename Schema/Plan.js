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
PlaneSchema.index({ id: 1 }, { unique: true });
PlaneSchema.statics.incrementId = async function () {
    const lastPlan = await this.findOne().sort({ id: -1 });
    return lastPlan ? lastPlan.id + 1 : 1;
};

export default model('Plan', PlaneSchema);