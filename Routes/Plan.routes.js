import router from 'express';
import { PlanController } from '../Controller/Plan.controller.js';
import { verifyToken, verifyRol } from '../Middleware/Auth.js';
const planRoutes = router();
const planController = new PlanController();
planRoutes.get('/plan', planController.getPlan);
planRoutes.post('/plan', verifyToken, verifyRol(['admin', 'user']), planController.postPlan);
planRoutes.put('/plan/:id', verifyToken, verifyRol(['admin', 'user']), planController.putPlan);
planRoutes.delete('/plan/:id', verifyToken, verifyRol(['admin', 'user']), planController.deletePlan);

export { planRoutes };