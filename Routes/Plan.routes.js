import router from 'express';
import { PlanController } from '../Controller/Plan.controller.js';
const planRoutes = router();
const planController = new PlanController();
planRoutes.get('/plan', planController.getPlan);
planRoutes.post('/plan', planController.postPlan);
planRoutes.put('/plan/:id', planController.putPlan);
planRoutes.delete('/plan/:id', planController.deletePlan);

export { planRoutes };