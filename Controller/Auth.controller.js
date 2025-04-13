import User from '../Schema/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
    constructor() {
    }
    async Register(req, res) {
        try {
            const { email, password } = req.body;
            const crypt = await bcrypt.hash(password, 10)
            const user = new User({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email,
                password: crypt,
                rol: req.body.rol || 'user',
                documento: req.body.documento,
                tipoDocumento: req.body.tipoDocumento,
                telefono: req.body.telefono,
                fechaNacimiento: req.body.fechaNacimiento,
                eps: req.body.eps,
            });
            const UserSave = await user.save();
            jwt.sign({ id: UserSave._id, rol: UserSave.rol }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({
                    token,
                    user: {
                        id: UserSave._id,
                        nombre: UserSave.nombre,
                        apellido: UserSave.apellido,
                        email: UserSave.email,
                        rol: UserSave.rol
                    }
                });
            });

        } catch (error) {
            res.status(500).send(error);
        }
    }
    async Login(req, res) {
        const { email, password } = req.body;
        try {
            const userFound = await User.findOne({ email });
            if (!userFound) {
                return res.status(400).json({ message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: userFound._id, rol: userFound.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('access_token', token, { httpOnly: true, secure: true });
            res.json({
                token,
                user: {
                    id: userFound._id,
                    nombre: userFound.nombre,
                    apellido: userFound.apellido,
                    email: userFound.email,
                    rol: userFound.rol
                }
            });
        } catch (error) {

        }
    }
    async verifyToken(req, res) {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
            if (error) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            const userFound = await User.findById(user.id);
            if (!userFound) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ user: userFound });
        })
    }
    async Logout(req, res) {
        res.clearCookie('access_token');
        res.json({ message: 'Logout successful' });
    }

}
export const authController = new AuthController();