import { RolController } from "../Controller/Rol.controller.js";
import router from 'express';

const rolRoutes = router();
const rolController = new RolController();
rolRoutes.get('/rol', rolController.getRol);
rolRoutes.post('/rol', rolController.postRol);
rolRoutes.put('/rol/:id', rolController.putRol);
rolRoutes.delete('/rol/:id', rolController.deleteRol);

export { rolRoutes };