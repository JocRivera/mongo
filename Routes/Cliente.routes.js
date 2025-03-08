import router from 'express';
import { ClienteController } from '../Controller/Clientes.controller.js';
const clienteRoutes = router();
const clienteController = new ClienteController();
clienteRoutes.get('/cliente', clienteController.getCliente);
clienteRoutes.post('/cliente', clienteController.postCliente);
clienteRoutes.put('/cliente/:id', clienteController.putCliente);
clienteRoutes.delete('/cliente/:id', clienteController.deleteCliente);

export { clienteRoutes };