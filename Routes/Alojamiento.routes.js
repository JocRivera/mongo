import router from 'express';
import { getAlojamiento, postAlojamiento, putAlojamiento, deleteAlojamiento } from '../Controller/Alojamiento.controller.js';

const alojamientoRoutes = router();

alojamientoRoutes.get('/alojamiento', getAlojamiento);
alojamientoRoutes.post('/alojamiento', postAlojamiento);
alojamientoRoutes.put('/alojamiento/:id', putAlojamiento);
alojamientoRoutes.delete('/alojamiento/:id', deleteAlojamiento);

export { alojamientoRoutes };