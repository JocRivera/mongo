import Plan from '../Schema/Plan.js';

export class PlanController {
    constructor() {
    }
    async getPlan(req, res) {
        try {
            const plan = await Plan.find()
                .populate('idService')
            res.json(plan);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async postPlan(req, res) {
        try {
            const plan = new Plan(req.body);
            await plan.save();
            res.json(plan);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async putPlan(req, res) {
        try {
            const { id } = req.params;
            await Plan.updateOne({
                id:
                    id
            }, req.body);
            res.json({ message: 'Plan actualizado' });
        }
        catch (error) {
            res.status(500).send
                (error);
        }
    }
    async deletePlan(req, res) {
        try {
            const { id } = req.params;
            await Plan.deleteOne({ id: id });
            res.json({ message: 'Plan eliminado' });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}