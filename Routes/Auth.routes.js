import router from 'express'
import { AuthController } from '../Controller/Auth.controller.js'
const authRoutes = router()
const authController = new AuthController()
authRoutes.post('/login')
authRoutes.post('/register', authController.postUser)

export { authRoutes }