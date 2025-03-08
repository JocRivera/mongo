import router from 'express';
import { ServicioController } from '../Controller/Servicio.controller.js';
const servicioRoutes = router();
const servicioController = new ServicioController();
servicioRoutes.get('/servicio', servicioController.getServicio);
servicioRoutes.post('/servicio', servicioController.postServicio);
servicioRoutes.put('/servicio/:id', servicioController.putServicio);
servicioRoutes.delete('/servicio/:id', servicioController.deleteServicio);

export { servicioRoutes };