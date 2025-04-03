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
            });
            const UserSave = await user.save();
            jwt.sign({ id: UserSave._id, rol: UserSave.rol }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({ token });
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
            res.json({ token });
        } catch (error) {

        }
    }
}
export const authController = new AuthController();