import router from 'express';
import getDisponibilidad from '../services/disponibilidad.js';

const disponibilidadRoutes = router();

disponibilidadRoutes.get('/disponibilidad', getDisponibilidad);

export { disponibilidadRoutes };

