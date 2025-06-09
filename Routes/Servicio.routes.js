import router from 'express';
import { ServicioController } from '../Controller/Servicio.controller.js';
import { verifyToken, verifyRol } from '../Middleware/Auth.js';
const servicioRoutes = router();
const servicioController = new ServicioController();
servicioRoutes.get('/servicio', servicioController.getServicio);
servicioRoutes.post('/servicio', verifyToken, verifyRol(['admin']), servicioController.postServicio);
servicioRoutes.put('/servicio/:id', verifyToken, verifyRol(['admin']), servicioController.putServicio);
servicioRoutes.delete('/servicio/:id', verifyToken, verifyRol(['admin']), servicioController.deleteServicio);

export { servicioRoutes };