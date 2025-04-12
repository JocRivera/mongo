import { Router } from 'express'
import { AuthController } from '../Controller/Auth.controller.js'
const authRoutes = Router()
const authController = new AuthController()
authRoutes.post('/login', authController.Login)
authRoutes.post('/register', authController.Register)
authRoutes.get('/verify', authController.verifyToken)
authRoutes.post('/logout', authController.Logout)
export { authRoutes }