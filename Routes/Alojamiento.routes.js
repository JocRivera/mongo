import router from 'express';
import { getAlojamientoById, getAlojamiento, postAlojamiento, putAlojamiento, deleteAlojamiento } from '../Controller/Alojamiento.controller.js';
import { verifyToken, verifyRol } from '../Middleware/Auth.js';

const alojamientoRoutes = router();

alojamientoRoutes.get('/alojamiento', getAlojamiento);
alojamientoRoutes.get('/alojamiento/:id', getAlojamientoById);
alojamientoRoutes.post('/alojamiento', verifyToken, verifyRol(['admin']), postAlojamiento);
alojamientoRoutes.put('/alojamiento/:id', verifyToken, verifyRol(['admin']), putAlojamiento);
alojamientoRoutes.delete('/alojamiento/:id', verifyToken, verifyRol(['admin']), deleteAlojamiento);

export { alojamientoRoutes };