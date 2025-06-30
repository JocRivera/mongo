import router from 'express';
import { PlanController } from '../Controller/Plan.controller.js';
import { ProgramacionController } from '../Controller/Programacion.controller.js';
import { verifyToken, verifyRol } from '../Middleware/Auth.js';
const planRoutes = router();
const planController = new PlanController();
const programacionController = new ProgramacionController();
planRoutes.get('/plan', planController.getPlan);
planRoutes.post('/plan', verifyToken, verifyRol(['admin', 'user']), planController.postPlan);
planRoutes.get('/plan/static', verifyToken, verifyRol(['admin', 'user']), planController.getStaticPlan);
planRoutes.put('/plan/:id', verifyToken, verifyRol(['admin', 'user']), planController.putPlan);
planRoutes.delete('/plan/:id', verifyToken, verifyRol(['admin', 'user']), planController.deletePlan);
planRoutes.get('/programacion', verifyToken, verifyRol(['admin', 'user']), programacionController.getAll);
planRoutes.get('/programacion/rango', verifyToken, verifyRol(['admin', 'user']), programacionController.getByRange);
planRoutes.post('/programacion', verifyToken, verifyRol(['admin', 'user']), programacionController.create);
planRoutes.put('/programacion/:id', verifyToken, verifyRol(['admin', 'user']), programacionController.update);
planRoutes.delete('/programacion/:id', verifyToken, verifyRol(['admin', 'user']), programacionController.delete);
planRoutes.get('/programacion/:id', verifyToken, verifyRol(['admin', 'user']), programacionController.getById);


export { planRoutes };