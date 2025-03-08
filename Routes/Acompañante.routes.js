import router from 'express';
import { AcompananteController } from '../Controller/Acompañante.controller.js';
const acompananteRoutes = router();
const acompananteController = new AcompananteController();
acompananteRoutes.get('/acompanante', acompananteController.getAcompanante);
acompananteRoutes.post('/acompanante', acompananteController.postAcompanante);
acompananteRoutes.put('/acompanante/:id', acompananteController.putAcompanante);
acompananteRoutes.delete('/acompanante/:id', acompananteController.deleteAcompanante);

export { acompananteRoutes };