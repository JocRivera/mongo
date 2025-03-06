import router from 'express';
import { ReservaController } from '../Controller/Reserva.controller.js';
const reservaRoutes = router();
const reservaController = new ReservaController();
reservaRoutes.get('/reserva', reservaController.getReserva);
reservaRoutes.post('/reserva', reservaController.postReserva);
reservaRoutes.put('/reserva/:id', reservaController.putReserva);
reservaRoutes.delete('/reserva/:id', reservaController.deleteReserva);
export { reservaRoutes };
