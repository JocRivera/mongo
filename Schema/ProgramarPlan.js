import { Schema, model } from "mongoose";
const ProgramarPlanSchema = new Schema({
    idPlan: {
        type: Schema.Types.ObjectId, // ✅ SOLO UNO
        ref: 'Plan',
        required: true,
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFin: {
        type: Date,
        required: true,
    },
});
export default model('ProgramarPlan', ProgramarPlanSchema);